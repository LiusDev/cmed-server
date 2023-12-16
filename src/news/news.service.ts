import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { New } from './new.entity';
import { Like, Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-new.dto';
import * as cheerio from 'cheerio';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New) private readonly repo: Repository<New>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll({
    title,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'ASC',
  }: {
    title?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<New[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: title ? { title: Like(`%${title}%`) } : {},
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number): Promise<New> {
    return await this.repo.findOneBy({ id });
  }

  async create(newItem: CreateNewDto): Promise<New> {
    const { title, content } = newItem;
    const $ = cheerio.load(content);
    const imgTags = $('img');
    for (let i = 0; i < imgTags.length; i++) {
      const img = imgTags[i];
      const src = $(img).attr('src');
      if (src.startsWith('data:image')) {
        const base64Data = src.split(',')[1];
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const result = await this.imagesService.uploadImage({
          buffer: imageBuffer,
        } as Express.Multer.File);
        $(img).attr('src', result);
      }
    }
    const updatedContent = this.repo.create({
      title,
      content: $.html(),
    });

    return await this.repo.save(updatedContent);
  }

  async update(id: number, newItem: CreateNewDto): Promise<New> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    Object.assign(item, newItem);
    return this.repo.save(item);
  }

  async updatePartial(id: number, newItem: Partial<New>): Promise<New> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    Object.assign(item, newItem);
    return this.repo.save(item);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    await this.repo.remove(item);
  }
}
