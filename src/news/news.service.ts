import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { New } from '../entities/new.entity';
import { Like, Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-new.dto';
import { UpdateNewDto } from './dtos/update-new.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New) private readonly repo: Repository<New>,
    private readonly imagesService: ImagesService,
    private readonly categoriesService: CategoriesService,
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
      relations: {
        category: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: title ? { title: Like(`%${title}%`) } : {},
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number): Promise<New> {
    return await this.repo.findOne({
      relations: {
        category: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(newItem: CreateNewDto, createdUser: User): Promise<New> {
    const { title, description, featuredImage, content, categoryId } = newItem;

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const featuredImageURL = await this.imagesService.uploadBase64Image(
      'news',
      featuredImage,
    );

    const item = this.repo.create({
      title,
      description,
      featuredImage: featuredImageURL,
      content,
      category,
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateNew: UpdateNewDto | Partial<UpdateNewDto>,
    modifiedUser: User,
  ): Promise<New> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Not found');
    }

    const { categoryId, featuredImage, ...rest } = updateNew;

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      item.category = category;
    }

    if (featuredImage) {
      this.imagesService.deleteImage(item.featuredImage);
      const featuredImageURL = await this.imagesService.uploadBase64Image(
        'news',
        featuredImage,
      );
      item.featuredImage = featuredImageURL;
    }

    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;

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
