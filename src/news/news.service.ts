import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { New } from '../entities/new.entity';
import { Like, Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-new.dto';
import { UpdateNewDto } from './dtos/update-new.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import { toWebpString } from '../utils';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New) private readonly repo: Repository<New>,
    private readonly imagesService: ImagesService,
    private readonly categoriesService: CategoriesService,
  ) { }

  async findAll({
    title,
    description,
    category,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    title?: string;
    description?: string;
    category?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<New[]> {
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
        title: Like(`%${title || ''}%`),
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
    title,
    description,
    category,
  }: {
    title?: string;
    description?: string;
    category?: string;
  }): Promise<number> {
    const validCategory = parseInt(category) || 0;

    return await this.repo.count({
      where: {
        title: Like(`%${title || ''}%`),
        description: Like(`%${description || ''}%`),
        ...(validCategory ? { category: { id: validCategory } } : {}),
      },
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

    const image = (await this.imagesService.uploadBase64Image('images', featuredImage)).secure_url

    const category = await this.categoriesService.findOne(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const item = this.repo.create({
      title,
      description,
      featuredImage: image,
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

    Object.assign(item, rest);
    item.modifiedBy = modifiedUser;
    if (featuredImage && featuredImage.startsWith('data:image')) {
      await Promise.all([
        this.imagesService.deleteImage(item.featuredImage),
        this.imagesService.uploadBase64Image("images", featuredImage).then(r => item.featuredImage = r.secure_url)
      ])
    }
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
