import { OnModuleInit } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersService implements OnModuleInit {
    private readonly repo;
    constructor(repo: Repository<User>);
    onModuleInit(): Promise<void>;
    findAll({ username, name, page, perPage, sortBy, order, }: {
        username?: string;
        name?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByUsername(username: string): Promise<User>;
    create(user: CreateUserDto): Promise<User>;
    update(id: number, attrs: UpdateUserDto | Partial<UpdateUserDto>): Promise<User>;
    remove(id: number): Promise<void>;
}
