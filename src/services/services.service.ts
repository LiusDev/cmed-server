import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Like, Repository } from 'typeorm';
import { CreateServiceDto } from './dtos/create-service.dto';
import { User } from 'src/entities/user.entity';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { ImagesService } from 'src/images/images.service';

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

  async findToHome() {
    return await this.repo.find({
      where: {
        showInHome: true
      }
    })
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
    const { name, description, featuredImage, featuredImage2, logo, content } = newItem;
    const images = await Promise.all([featuredImage, featuredImage2, logo].map(async (image) => this.imagesService.uploadBase64Image("images", image)))
    const item = this.repo.create({
      name,
      description,
      featuredImage: images[0].secure_url,
      featuredImage2: images[1].secure_url,
      logo: images[2].secure_url,
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
    const { featuredImage, featuredImage2, logo, ...rest } = updateItem;
    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;
    if (featuredImage && featuredImage.startsWith("data:image")) {
      item.featuredImage = (await this.imagesService.uploadBase64Image("images", updateItem.featuredImage)).secure_url
    }
    if (featuredImage2 && featuredImage2.startsWith("data:image")) {
      item.featuredImage2 = (await this.imagesService.uploadBase64Image("images", updateItem.featuredImage2)).secure_url
    }
    if (logo && logo.startsWith("data:image")) {
      item.logo = (await this.imagesService.uploadBase64Image("images", updateItem.logo)).secure_url
    }
    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Service not found');
    }
    const images = [item.featuredImage, item.featuredImage2, item.logo].filter(i => i.startsWith("https://res.cloudinary.com"))
    await this.imagesService.deleteImage(...images)
    await this.repo.remove(item);
  }
}
