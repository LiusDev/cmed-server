import { ServicesService } from './services.service';
import { CreateServiceDto } from './dtos/create-service.dto';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(query: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/service.entity").Service[]>;
    findOne(id: number): Promise<import("../entities/service.entity").Service>;
    create(body: CreateServiceDto, createdUser: User): Promise<import("../entities/service.entity").Service>;
    update(id: number, body: CreateServiceDto, modifiedUser: User): Promise<import("../entities/service.entity").Service>;
    partialUpdate(id: number, body: Partial<CreateServiceDto>, modifiedUser: User): Promise<import("../entities/service.entity").Service>;
    remove(id: number, res: Response): Promise<void>;
}
