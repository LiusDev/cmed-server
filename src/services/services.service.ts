import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Like, Repository } from 'typeorm';
import { CreateServiceDto } from './dtos/create-service.dto';
import { User } from 'src/entities/user.entity';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { ImagesService } from 'src/images/images.service';
import { toWebpString } from '../utils';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly repo: Repository<Service>,
    private readonly imagesService: ImagesService,
  ) { }

  async findAll({
    name,
    description,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    name?: string;
    description?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Service[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: {
        name: Like(`%${name || ''}%`),
        description: Like(`%${description || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number): Promise<Service> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(newItem: CreateServiceDto, createdUser: User): Promise<Service> {
    const { name, description, featuredImage, featuredImage2, content } = newItem;

    const item = this.repo.create({
      name,
      description,
      featuredImage: await toWebpString(featuredImage),
      featuredImage2: await toWebpString(featuredImage2),
      content,
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateItem: UpdateServiceDto | Partial<UpdateServiceDto>,
    modifiedUser: User,
  ): Promise<Service> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Service not found');
    }

    Object.assign(item, updateItem);
    item.modifiedBy = modifiedUser;
    if (updateItem.featuredImage) {
      item.featuredImage = await toWebpString(updateItem.featuredImage)
    }
    if (updateItem.featuredImage2) {
      item.featuredImage2 = await toWebpString(updateItem.featuredImage2)
    }
    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Service not found');
    }

    await this.repo.remove(item);
  }
}
