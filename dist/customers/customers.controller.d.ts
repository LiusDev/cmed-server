import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { User } from 'src/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { Response } from 'express';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    findAll(query: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/customer.entity").Customer[]>;
    findOne(id: number): Promise<import("../entities/customer.entity").Customer>;
    create(body: CreateCustomerDto, createdUser: User): Promise<import("../entities/customer.entity").Customer>;
    update(id: number, body: UpdateCustomerDto, modifiedUser: User): Promise<import("../entities/customer.entity").Customer>;
    partialUpdate(id: number, body: Partial<UpdateCustomerDto>, modifiedUser: User): Promise<import("../entities/customer.entity").Customer>;
    remove(id: number, res: Response): Promise<void>;
}
