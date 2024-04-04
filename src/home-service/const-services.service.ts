import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateConstServiceDto } from './dtos/create-const-service.dto';
import { User } from 'src/entities/user.entity';
import { ConstHomeServiceDto } from './dtos/update-const-service.dto';
import { ImagesService } from 'src/images/images.service';
import { ConstService } from '../entities/const-service.entity';
import { Category } from '../entities/category.entity';
import { deleteImages, updateImage } from '../utils';

@Injectable()
export class ConstServicesService {
  constructor(
    @InjectRepository(ConstService)
    private readonly repo: Repository<ConstService>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
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
  }): Promise<ConstService[]> {
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

  async findOne(id: number): Promise<ConstService> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
        category: true,
      },
      where: { id },
    });
  }

  async create(newItem: CreateConstServiceDto, createdUser: User): Promise<ConstService> {
    const { name, description, index, content, logo, featuredImage, featuredImage2, categoryId } = newItem;

    const category = await this.categoryRepo.findOne({ where: { id: categoryId } })

    const item = this.repo.create({
      name,
      description,
      content,
      index,
      category,
      createdBy: createdUser,
    });

    const tasks: Promise<void>[] = []
    if (logo.startsWith("https://res.cloudinary.com/"))
      tasks.push(this.imagesService.uploadBase64Image("images", logo).then(r => {
        item.logo = r.secure_url
      }))

    if (featuredImage.startsWith("https://res.cloudinary.com/")) {
      tasks.push(this.imagesService.uploadBase64Image("images", featuredImage).then(r => {
        item.featuredImage = r.secure_url
      }))
    }

    if (featuredImage2.startsWith("https://res.cloudinary.com/")) {
      tasks.push(
        this.imagesService.uploadBase64Image("images", featuredImage2).then(r => {
          item.featuredImage2 = r.secure_url
        })
      )
    }

    await Promise.all(tasks)

    return await this.repo.save(item);
  }

  async getTop4() {
    const data = await this.repo.find({
      select: { id: true, name: true, description: true }, order: {
        index: "ASC"
      }
    })
    return data.map(i => ({ id: i.id, name: i.name, description: i.description }))
  }

  async update(
    id: number,
    updateItem: ConstHomeServiceDto | Partial<ConstHomeServiceDto>,
    modifiedUser: User,
  ): Promise<ConstService> {
    const item = await this.repo.findOne({
      relations: {
        category: true,
      },
      where: { id }
    });
    if (!item) {
      throw new NotFoundException('Service not found');
    }
    const { categoryId, featuredImage, featuredImage2, logo, ...rest } = updateItem;
    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;

    if (item.category == null || item.category.id !== categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: categoryId } })
      item.category = category
    }

    await updateImage({ featuredImage, featuredImage2, logo }, item, this.imagesService);


    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Service not found');
    }
    await deleteImages(['featuredImage', 'featuredImage2', 'logo'], item, this.imagesService);
    await this.repo.remove(item);
  }
}
