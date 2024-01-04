import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { Like, Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { User } from 'src/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll({
    name,
    description,
    category,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    name?: string;
    description?: string;
    category?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Document[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;
    const validCategory = parseInt(category) || 0;

    return await this.repo.find({
      relations: {
        category: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: {
        name: Like(`%${name || ''}%`),
        description: Like(`%${description || ''}%`),
        ...(validCategory ? { category: { id: validCategory } } : {}),
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
    description,
    category,
  }: {
    name?: string;
    description?: string;
    category?: string;
  }): Promise<number> {
    const validCategory = parseInt(category) || 0;

    return await this.repo.count({
      where: {
        name: Like(`%${name || ''}%`),
        description: Like(`%${description || ''}%`),
        ...(validCategory ? { category: { id: validCategory } } : {}),
      },
    });
  }

  async findOne(id: number): Promise<Document> {
    return await this.repo.findOne({
      relations: {
        category: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(
    newItem: CreateDocumentDto,
    createdUser: User,
  ): Promise<Document> {
    const { name, description, documentUrl, categoryId } = newItem;

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const item = this.repo.create({
      name,
      description,
      documentUrl,
      category,
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateItem: UpdateDocumentDto | Partial<UpdateDocumentDto>,
    modifiedUser: User,
  ): Promise<Document> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Document not found');
    }

    const { categoryId, ...rest } = updateItem;

    if (categoryId) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      item.category = category;
    }

    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;

    return await this.repo.save(item);
  }

  async delete(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Document not found');
    }

    await this.repo.remove(item);
  }
}
