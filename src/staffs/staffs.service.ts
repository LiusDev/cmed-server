import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { Like, Repository } from 'typeorm';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { User } from 'src/entities/user.entity';
import { UpdateStaffDto } from './dtos/update-staff.dto';
import { toWebp } from '../utils';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff) private readonly repo: Repository<Staff>,
  ) { }

  async findAll({
    name,
    position,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    name?: string;
    position?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }) {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;
    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: {
        name: Like(`%${name || ''}%`),
        position: Like(`%${position || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number) {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(newStaff: CreateStaffDto, createdUser: User) {
    const { name, position, featuredImage } = newStaff;

    const staff = this.repo.create({
      name,
      position,
      featuredImage: await toWebp(featuredImage),
      createdBy: createdUser,
    });

    return await this.repo.save(staff);
  }

  async update(
    id: number,
    updateStaff: UpdateStaffDto | Partial<UpdateStaffDto>,
    modifiedUser: User,
  ) {
    const staff = await this.repo.findOneBy({ id });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    Object.assign(staff, updateStaff);
    staff.modifiedBy = modifiedUser;
    if (updateStaff.featuredImage) {
      staff.featuredImage = await toWebp(updateStaff.featuredImage)
    }

    return await this.repo.save(staff);
  }

  async remove(id: number) {
    const staff = await this.repo.findOneBy({ id });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }

    await this.repo.remove(staff);
  }
}
