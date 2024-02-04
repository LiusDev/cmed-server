import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { Like, Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { User } from 'src/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { join } from 'path';
import { promises as fs } from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
    private readonly categoriesService: CategoriesService,
    private readonly configService: ConfigService,
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
    file: Express.Multer.File,
    createdUser: User,
  ): Promise<Document> {
    const { name, description, categoryId } = newItem;

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const filePath = join(__dirname, '..', '..', 'uploads', file.originalname);

    const apiUrl = this.configService.get('API_URL');

    const fileUrl = `${apiUrl}/uploads/${file.originalname}`;

    await fs.writeFile(filePath, file.buffer);

    const item = this.repo.create({
      name,
      description,
      document: fileUrl,
      category,
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    file: Express.Multer.File,
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

    if (file) {
      const url = new URL(item.document);
      const fileName = url.pathname.split('/').pop();
      const oldFilePath = join(__dirname, '..', '..', 'uploads', fileName);
      await fs.unlink(oldFilePath);

      const newFilePath = join(
        __dirname,
        '..',
        '..',
        'uploads',
        file.originalname,
      );
      await fs.writeFile(newFilePath, file.buffer);

      const apiUrl = this.configService.get('API_URL');
      const fileUrl = `${apiUrl}/uploads/${file.originalname}`;
      item.document = fileUrl;
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

    const url = new URL(item.document);
    const fileName = url.pathname.split('/').pop();
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);
    await fs.unlink(filePath);

    await this.repo.remove(item);
  }
}
