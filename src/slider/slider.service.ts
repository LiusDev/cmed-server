import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-slider.dto';
import { UpdateNewDto } from './dtos/update-slider.dto';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import { Slider } from '../entities/slider.entity';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider) private readonly repo: Repository<Slider>,
    private readonly imagesService: ImagesService
  ) { }

  async findAll({
    title,
    description,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    title?: string;
    description?: string;
    category?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Slider[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: {
        title: Like(`%${title || ''}%`),
        description: Like(`%${description || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async countAll({
    title,
    description,
    category,
  }: {
    title?: string;
    description?: string;
    category?: string;
  }): Promise<number> {
    const validCategory = parseInt(category) || 0;

    return await this.repo.count({
      where: {
        title: Like(`%${title || ''}%`),
        description: Like(`%${description || ''}%`),
        ...(validCategory ? { category: { id: validCategory } } : {}),
      },
    });
  }

  async findOne(id: number): Promise<Slider> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(newItem: CreateNewDto, createdUser: User): Promise<Slider> {
    const { image, ...rest } = newItem;


    const item = this.repo.create({
      ...rest,
      image: (await this.imagesService.uploadBase64Image("images", image)).secure_url,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateNew: UpdateNewDto | Partial<UpdateNewDto>,
    modifiedUser: User,
  ): Promise<Slider> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    const { image, ...rest } = updateNew;

    Object.assign(item, rest);
    if (image && image.localeCompare(item.image) !== 0) {
      await this.imagesService.deleteImage(item.image)
      item.image = (await this.imagesService.uploadBase64Image("images", image)).secure_url;
    }
    return this.repo.save(item);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }
    await this.imagesService.deleteImage(item.image);
    await this.repo.remove(item);
  }
}
