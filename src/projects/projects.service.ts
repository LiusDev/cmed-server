import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Like, Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from 'src/entities/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectImage } from '../entities/project_image.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
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
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(newItem: CreateProjectDto, createdUser: User): Promise<Project> {
    const { name, description, featuredImage, content, images } = newItem;

    const item = this.repo.create({
      name,
      description,
      featuredImage,
      content,
      images: images?.map(i => ({ image: i } as ProjectImage)) ?? [],
      createdBy: createdUser,
    });

    return await this.repo.save(item);
  }

  async update(
    id: number,
    updateItem: UpdateProjectDto | Partial<UpdateProjectDto>,
    modifiedUser: User,
  ): Promise<Project> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Project not found');
    }

    Object.assign(item, updateItem);
    item.modifiedBy = modifiedUser;

    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Project not found');
    }
    await this.repo.remove(item);
  }
}
