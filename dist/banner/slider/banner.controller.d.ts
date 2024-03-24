import { BannersService } from './banner.service';
import { CreateBanner } from './dtos/create-banner.dto';
import { UpdateNewDto } from './dtos/update-banner.dto';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Banner } from '../../entities/banner.entity';
export declare class bannersController {
    private readonly banner;
    constructor(banner: BannersService);
    getAllSliders(query: {
        name?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Banner[]>;
    countAllSliders(query: {
        name?: string;
    }): Promise<number>;
    getOneNews(id: number): Promise<Banner>;
    createNews(body: CreateBanner, createdUser: User): Promise<Banner>;
    updateNews(id: number, body: UpdateNewDto, modifiedUser: User): Promise<Banner>;
    updatePartialNews(id: number, body: Partial<UpdateNewDto>, modifiedUser: User): Promise<Banner>;
    deleteNews(id: number, res: Response): Promise<void>;
}
