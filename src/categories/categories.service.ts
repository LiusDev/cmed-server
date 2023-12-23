import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
  ) {}

  async findAll({
    name,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'ASC',
  }: {
    name?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Category[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      relations: {
        news: true,
        documents: true,
        createdBy: true,
        modifiedBy: true,
      },
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

  async findOne(id: number): Promise<Category> {
    return await this.repo.findOne({
      relations: {
        news: true,
        documents: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(
    newItem: CreateCategoryDto,
    createdUser: User,
  ): Promise<Category> {
    const { name } = newItem;

    const item = this.repo.create({
      name,
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateItem: UpdateCategoryDto | Partial<UpdateCategoryDto>,
    modifiedUser: User,
  ): Promise<Category> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Category not found');
    }

    Object.assign(item, updateItem);
    item.modifiedBy = modifiedUser;

    return await this.repo.save(item);
  }

  async delete(id: number): Promise<Category> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Category not found');
    }

    return await this.repo.remove(item);
  }
}
