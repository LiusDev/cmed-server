import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { User } from 'src/entities/user.entity';
import { UpdatePartnerDto } from './dtos/update-partner.dto';
import { Response } from 'express';
export declare class PartnersController {
    private readonly partnersService;
    constructor(partnersService: PartnersService);
    findAll(query: {
        name?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/partner.entity").Partner[]>;
    findOne(id: number): Promise<import("../entities/partner.entity").Partner>;
    create(body: CreatePartnerDto, createdUser: User): Promise<import("../entities/partner.entity").Partner>;
    update(id: number, body: UpdatePartnerDto, modifiedUser: User): Promise<import("../entities/partner.entity").Partner>;
    partialUpdate(id: number, body: Partial<UpdatePartnerDto>, modifiedUser: User): Promise<import("../entities/partner.entity").Partner>;
    delete(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
