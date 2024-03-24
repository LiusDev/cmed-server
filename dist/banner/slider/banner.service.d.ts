import { Repository } from 'typeorm';
import { CreateBanner } from './dtos/create-banner.dto';
import { UpdateNewDto } from './dtos/update-banner.dto';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import { Banner } from '../../entities/banner.entity';
export declare class BannersService {
    private readonly repo;
    private readonly imagesService;
    constructor(repo: Repository<Banner>, imagesService: ImagesService);
    findAll({ name, page, perPage, sortBy, order, }: {
        name?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Banner[]>;
    countAll({ name, }: {
        name?: string;
    }): Promise<number>;
    findOne(id: number): Promise<Banner>;
    create(newItem: CreateBanner): Promise<Banner>;
    update(id: number, updateNew: UpdateNewDto | Partial<UpdateNewDto>, modifiedUser: User): Promise<Banner>;
    delete(id: number): Promise<void>;
}
