import { Partner } from 'src/entities/partner.entity';
import { Repository } from 'typeorm';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { User } from 'src/entities/user.entity';
import { UpdatePartnerDto } from './dtos/update-partner.dto';
import { ImagesService } from 'src/images/images.service';
export declare class PartnersService {
    private readonly repo;
    private readonly imagesService;
    constructor(repo: Repository<Partner>, imagesService: ImagesService);
    findAll({ name, page, perPage, sortBy, order, }: {
        name?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Partner[]>;
    findOne(id: number): Promise<Partner>;
    create(partner: CreatePartnerDto, createdUser: User): Promise<Partner>;
    update(id: number, partner: UpdatePartnerDto | Partial<UpdatePartnerDto>, modifiedUser: User): Promise<Partner>;
    delete(id: number): Promise<void>;
}
