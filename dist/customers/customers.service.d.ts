import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { User } from 'src/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ImagesService } from 'src/images/images.service';
export declare class CustomersService {
    private readonly repo;
    private readonly imagesService;
    constructor(repo: Repository<Customer>, imagesService: ImagesService);
    findAll({ name, description, page, perPage, sortBy, order, }: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Customer[]>;
    findOne(id: number): Promise<Customer>;
    create(customer: CreateCustomerDto, createdUser: User): Promise<Customer>;
    update(id: number, customer: UpdateCustomerDto | Partial<UpdateCustomerDto>, modifiedUser: User): Promise<Customer>;
    remove(id: number): Promise<void>;
}
