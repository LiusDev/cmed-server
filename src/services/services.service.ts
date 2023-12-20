import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll(): Promise<Service[]> {
    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
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
    const { name, description, featuredImage, content } = newItem;
    const imageUrl = await this.imagesService.uploadBase64Image(
      'services',
      featuredImage,
    );
    const item = this.repo.create({
      name,
      description,
      featuredImage: imageUrl,
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
    if (updateItem.featuredImage) {
      const imageUrl = await this.imagesService.uploadBase64Image(
        'services',
        updateItem.featuredImage,
      );
      updateItem.featuredImage = imageUrl;
    }
    Object.assign(item, updateItem);
    item.modifiedBy = modifiedUser;

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
