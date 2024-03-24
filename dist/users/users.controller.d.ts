import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: {
        name?: string;
        username?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("src/entities/user.entity").User[]>;
    findOne(id: number): Promise<import("src/entities/user.entity").User>;
    create(body: CreateUserDto): Promise<import("src/entities/user.entity").User>;
    update(id: number, body: UpdateUserDto): Promise<import("src/entities/user.entity").User>;
    updatePartial(id: number, body: Partial<UpdateUserDto>): Promise<import("src/entities/user.entity").User>;
    remove(id: number, res: Response): Promise<void>;
}
