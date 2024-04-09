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
import { toWebpString } from '../utils';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ImagesService } from '../images/images.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
    private readonly categoriesService: CategoriesService,
    private readonly configService: ConfigService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imagesService: ImagesService
  ) { }
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

  async increaseDownloadCount(id: number): Promise<void> {
    const document = await this.repo.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException('Document not found');
    }
    document.download += 1;
    await this.repo.save(document);
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

  async findOne(id: number, download: boolean = false): Promise<Document> {
    const document = await this.repo.findOne({
      relations: {
        category: true,
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    })
    if (download) {
      document.download += 1
    } else {
      document.view += 1
    }
    await this.repo.update(document.id, { view: document.view, download: document.download })
    return document;
  }

  async create(
    newItem: CreateDocumentDto,
    file: Express.Multer.File,
    createdUser: User,
  ): Promise<Document> {
    const { categoryId, featuredImage, ...rest } = newItem;

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const [filePath, featuredImageUrl] = await Promise.all([this.cloudinaryService.uploadFile(file, {
      format: "pdf"
    }).then(i => i.secure_url), this.imagesService.uploadBase64Image("images", featuredImage).then(i => i.secure_url)])

    const item = this.repo.create({
      ...rest,
      document: filePath,
      featuredImage: featuredImageUrl,
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
    const item = await this.repo.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Document not found');
    }

    const { categoryId, featuredImage, ...rest } = updateItem;

    if (categoryId && (item.category == null || categoryId !== item.category.id)) {
      const category = await this.categoriesService.findOne(categoryId);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      item.category = category;
    }

    if (file && file.buffer.byteLength > 0) {
      await this.cloudinaryService.deleteFile(item.document)
      item.document = (await this.cloudinaryService.uploadFile(file, { folder: "documents", public_id: Date.now() + "_" + file.originalname, format: "pdf" })).secure_url
    }

    Object.assign(item, rest);
    if (featuredImage && featuredImage.localeCompare(item.featuredImage) !== 0) {
      await this.imagesService.deleteImage(item.featuredImage)
      item.featuredImage = await toWebpString(updateItem.featuredImage)
    }
    item.modifiedBy = modifiedUser;
    const result = await this.repo.update(id, item)
    return item;
  }

  async delete(id: number) {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Document not found');
    }

    await this.imagesService.deleteImage(item.featuredImage);
    await this.cloudinaryService.deleteFile(item.document);

    await this.repo.remove(item);
  }
}
