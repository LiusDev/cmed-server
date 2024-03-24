import { Service } from 'src/entities/service.entity';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dtos/create-service.dto';
import { User } from 'src/entities/user.entity';
import { UpdateServiceDto } from './dtos/update-service.dto';
import { ImagesService } from 'src/images/images.service';
export declare class ServicesService {
    private readonly repo;
    private readonly imagesService;
    constructor(repo: Repository<Service>, imagesService: ImagesService);
    findAll({ name, description, page, perPage, sortBy, order, }: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Service[]>;
    findOne(id: number): Promise<Service>;
    create(newItem: CreateServiceDto, createdUser: User): Promise<Service>;
    update(id: number, updateItem: UpdateServiceDto | Partial<UpdateServiceDto>, modifiedUser: User): Promise<Service>;
    remove(id: number): Promise<void>;
}
