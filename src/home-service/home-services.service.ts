import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateHomeServiceDto } from './dtos/create-home-service.dto';
import { User } from 'src/entities/user.entity';
import { UpdateHomeServiceDto } from './dtos/update-home-service.dto';
import { ImagesService } from 'src/images/images.service';
import { HomeService } from '../entities/home-service.entity';
import { Category } from '../entities/category.entity';

@Injectable()
export class HomeServicesService {
  constructor(
    @InjectRepository(HomeService)
    private readonly repo: Repository<HomeService>,
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
  }): Promise<HomeService[]> {
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

  async findOne(id: number): Promise<HomeService> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
        category: true
      },
      where: { id },
    });
  }

  async create(newItem: CreateHomeServiceDto, createdUser: User): Promise<HomeService> {
    const { name, description, index, content } = newItem;

    const category = await this.categoryRepo.findOne({ where: { id: newItem.categoryId } })

    await Promise.all(
      content.map(item => {
        const tasks: Promise<void>[] = []
        if (item.logo.startsWith("https://res.cloudinary.com/"))
          tasks.push(this.imagesService.uploadBase64Image("images", item.logo).then(r => {
            item.logo = r.secure_url
          }))

        if (item.featuredImage.startsWith("https://res.cloudinary.com/")) {
          tasks.push(this.imagesService.uploadBase64Image("images", item.featuredImage).then(r => {
            item.featuredImage = r.secure_url
          }))
        }

        if (item.featuredImage2.startsWith("https://res.cloudinary.com/")) {
          tasks.push(
            this.imagesService.uploadBase64Image("images", item.featuredImage2).then(r => {
              item.featuredImage2 = r.secure_url
            })
          )
        }
        return tasks
      }).flat()
    )

    const item = this.repo.create({
      name,
      description,
      content,
      index,
      category,
      createdBy: createdUser,
    });


    return await this.repo.save(item);
  }

  async getTop4() {
    const data = await this.repo.find({ select: { id: true, name: true, description: true } })
    return data.map(i => ({ id: i.id, name: i.name, description: i.description }))
  }

  async update(
    id: number,
    updateItem: UpdateHomeServiceDto | Partial<UpdateHomeServiceDto>,
    modifiedUser: User,
  ): Promise<HomeService> {
    const item = await this.repo.findOne({
      relations: {
        category: true,
      },
      where: { id }
    });
    if (!item) {
      throw new NotFoundException('Service not found');
    }
    const { content, ...rest } = updateItem;
    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;

    if (item.category.id !== updateItem.categoryId) {
      const category = await this.categoryRepo.findOne({ where: { id: updateItem.categoryId } })
      item.category = category
    }

    const deleteImages = item.content.map(i => i.logo).filter(i => i.startsWith("https://res.cloudinary.com/"))
    if (deleteImages.length > 0)
      await this.imagesService.deleteImage(...deleteImages)

    item.content = content

    await Promise.all(
      content.map(c => {
        const tasks: Promise<void>[] = []
        if (c.logo.startsWith("https://res.cloudinary.com/"))
          tasks.push(this.imagesService.uploadBase64Image("images", c.logo).then(r => {
            c.logo = r.secure_url
          }))

        if (c.featuredImage.startsWith("https://res.cloudinary.com/")) {
          tasks.push(this.imagesService.uploadBase64Image("images", c.featuredImage).then(r => {
            c.featuredImage = r.secure_url
          }))
        }

        if (c.featuredImage2.startsWith("https://res.cloudinary.com/")) {
          tasks.push(
            this.imagesService.uploadBase64Image("images", c.featuredImage2).then(r => {
              c.featuredImage2 = r.secure_url
            })
          )
        }
        return tasks
      }).flat()
    )

    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Service not found');
    }
    const images = item.content.map(i => [
      i.logo, i.featuredImage, i.featuredImage2
    ]).flat()
    if (images.length > 0) await this.imagesService.deleteImage(...images)
    await this.repo.remove(item);
  }
}
