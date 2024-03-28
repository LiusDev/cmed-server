import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBanner } from './dtos/create-banner.dto';
import { UpdateNewDto } from './dtos/update-banner.dto';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import { Banner } from '../../entities/banner.entity';
import { toWebpString } from '../../utils';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private readonly repo: Repository<Banner>,
    private readonly imagesService: ImagesService
  ) { }

  async findAll({
    name,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    name?: string;
    category?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Banner[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: {
        name: Like(`%${name || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async countAll({
    name,
  }: {
    name?: string;
  }): Promise<number> {

    return await this.repo.count({
      where: {
        name: Like(`%${name || ''}%`),
      },
    });
  }

  async findOne(id: number): Promise<Banner> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(newItem: CreateBanner): Promise<Banner> {
    const { name, image } = newItem;

    const item = this.repo.create({
      name,
      image: (await this.imagesService.uploadBase64Image("images", image)).secure_url,
    });
    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateNew: UpdateNewDto | Partial<UpdateNewDto>,
    modifiedUser: User,
  ): Promise<Banner> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    const { image, ...rest } = updateNew;

    Object.assign(item, rest);
    if (image && image.localeCompare(item.image) != 0) {
      await this.imagesService.deleteImage(item.image);
      item.image = (await this.imagesService.uploadBase64Image("images", image)).secure_url;
    }
    return this.repo.save(item);
  }

  async delete(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    await this.repo.remove(item);
    await this.imagesService.deleteImage(item.image);
  }
}
