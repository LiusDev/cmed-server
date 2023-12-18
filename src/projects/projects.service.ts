import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from 'src/entities/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
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
    const { name, description, content } = newItem;

    const item = this.repo.create({
      name,
      description,
      content,
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
