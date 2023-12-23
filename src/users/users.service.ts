import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll({
    username,
    name,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'ASC',
  }: {
    username?: string;
    name?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<User[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: {
        username: username ? Like(`%${username}%`) : undefined,
        name: name ? Like(`%${name}%`) : undefined,
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.repo.findOneBy({ username });
  }

  async create(user: CreateUserDto): Promise<User> {
    const { username, password, name, role } = user;
    const checkUser = await this.findOneByUsername(username);
    if (checkUser) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.repo.create({
      username,
      password: hashedPassword,
      name,
      role,
    });
    return await this.repo.save(newUser);
  }

  async update(
    id: number,
    attrs: UpdateUserDto | Partial<UpdateUserDto>,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot update admin user');
    }
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role === UserRole.ADMIN) {
      throw new ForbiddenException('Cannot delete admin user');
    }
    await this.repo.remove(user);
  }
}
