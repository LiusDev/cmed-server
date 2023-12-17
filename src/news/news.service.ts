import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { New } from '../entities/new.entity';
import { Like, Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-new.dto';
import { UpdateNewDto } from './dtos/update-new.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New) private readonly repo: Repository<New>,
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

  async create(newItem: CreateNewDto, createdUser: User): Promise<New> {
    const { title, description, featuredImage, content, categoryId } = newItem;

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const item = this.repo.create({
      title,
      description,
      featuredImage,
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

    const { categoryId, ...rest } = updateNew;

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      item.category = category;
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
