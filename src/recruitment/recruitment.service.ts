import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruitment } from 'src/entities/recruitment.entity';
import { Like, Repository } from 'typeorm';
import { CreateRecruitmentDto } from './dtos/create-recruitment.dto';
import { User } from 'src/entities/user.entity';
import { UpdateRecruitmentDto } from './dtos/update-recruitment.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private readonly repo: Repository<Recruitment>,
  ) {}

  async findAll({
    title,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    title?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Recruitment[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: {
        title: Like(`%${title || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async count({ title }: { title?: string }): Promise<number> {
    return await this.repo.count({
      where: {
        title: title,
      },
    });
  }

  async findOne(id: number): Promise<Recruitment> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: {
        id: id,
      },
    });
  }

  async create(
    newRecruitment: CreateRecruitmentDto,
    createdUser: User,
  ): Promise<Recruitment> {
    const { title, deadline, content } = newRecruitment;

    const recruitment = this.repo.create({
      title,
      deadline,
      content,
      createdBy: createdUser,
    });

    return await this.repo.save(recruitment);
  }

  async update(
    id: number,
    updatedRecruitment: UpdateRecruitmentDto | Partial<UpdateRecruitmentDto>,
    modifiedUser: User,
  ): Promise<Recruitment> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Recruitment not found');
    }
    Object.assign(item, updatedRecruitment);
    item.modifiedBy = modifiedUser;

    return await this.repo.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.repo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Recruitment not found');
    }

    await this.repo.remove(item);
  }
}
