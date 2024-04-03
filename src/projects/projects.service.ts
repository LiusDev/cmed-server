import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Like, Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from 'src/entities/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectImage } from '../entities/project_image.entity';
import { areArraysDifferent, toWebp, toWebpString } from '../utils';
import sharp from 'sharp';
import { ImagesService } from '../images/images.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
    @InjectRepository(ProjectImage)
    private readonly childRepo: Repository<ProjectImage>,
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
  }): Promise<Project[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      relations: {
        images: true
      },
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

  async count({
    name,
    description,
  }: {
    name?: string;
    description?: string;
  }): Promise<number> {
    return await this.repo.count({
      where: {
        name: Like(`%${name || ''}%`),
        description: Like(`%${description || ''}%`),
      },
    });
  }

  async findOne(id: number): Promise<Project> {
    return await this.repo.findOne({
      relations: {
        images: true
      },
      where: { id },
    });
  }

  async create(newItem: CreateProjectDto, createdUser: User): Promise<Project> {
    const { name, description, featuredImage, content, images } = newItem;
    const webpImages = await Promise.all(images?.map(i => this.imagesService.uploadBase64Image("images", i)) ?? [])
    const item = this.repo.create({
      name,
      description,
      featuredImage: (await this.imagesService.uploadBase64Image("images", featuredImage)).secure_url,
      content,
      images: webpImages.map(i => this.childRepo.create({ image: i.secure_url })),
      createdBy: createdUser,
    });
    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateItem: UpdateProjectDto | Partial<UpdateProjectDto>,
    modifiedUser: User,
  ): Promise<Project> {
    const item = await this.repo.findOne({ where: { id }, relations: { images: true } })
    if (!item) {
      throw new NotFoundException('Project not found');
    }
    const { images, featuredImage, ...rest } = updateItem
    Object.assign(item, rest);
    if (featuredImage && featuredImage.localeCompare(item.featuredImage) !== 0) {
      await this.imagesService.deleteImage(item.featuredImage)
      item.featuredImage = (await this.imagesService.uploadBase64Image("images", featuredImage)).secure_url
    }

    let check = false

    if (item.images && images.length != 0) check = areArraysDifferent(item.images.map(i => i.image), images)
    if (images.length == 0 && item.images != null) check = true

    if (check) {
      const imagesToDelete = item.images.filter(i => !images.includes(i.image))
      imagesToDelete.forEach(i => item.images.splice(item.images.indexOf(i), 1))
      if (imagesToDelete.length > 0)
        await this.imagesService.deleteImage(...imagesToDelete.map(i => i.image))
      this.childRepo.remove(imagesToDelete)
      const newImages = images.filter(i => i.startsWith("data:image"))
      const webpImages = await Promise.all(newImages.map(i => this.imagesService.uploadBase64Image("images", i).then(i => i.secure_url)))
      item.images.push(...webpImages.map(i => this.childRepo.create({ image: i })))
    }
    item.modifiedBy = modifiedUser;
    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    try {
      const project = await this.repo.findOne({
        relations: {
          images: true
        },
        where: { id }
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      await this.imagesService.deleteImage(...project.images.map(i => i.image, project.featuredImage));
      await this.repo.delete(id);
    } catch (error) {
      throw new Error('Failed to remove project');
    }
  }
}
