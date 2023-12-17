import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.repo.findOneBy({ id });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.repo.findOneBy({ username });
  }

  async create(user: CreateUserDto): Promise<User> {
    const checkUser = await this.findOneByUsername(user.username);
    if (checkUser) {
      throw new ConflictException('Username already exists');
    }

    const newUser = this.repo.create(user);
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
    Object.assign(user, attrs);
    return await this.repo.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.repo.remove(user);
  }
}
