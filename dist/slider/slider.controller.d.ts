import { SlidersService } from './slider.service';
import { CreateNewDto } from './dtos/create-slider.dto';
import { UpdateNewDto } from './dtos/update-slider.dto';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
import { Slider } from '../entities/slider.entity';
export declare class slidersController {
    private readonly slidersService;
    constructor(slidersService: SlidersService);
    getAllSliders(query: {
        title?: string;
        index?: number;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Slider[]>;
    countAllSliders(query: {
        title?: string;
        description?: string;
    }): Promise<number>;
    getOneNews(id: number): Promise<Slider>;
    createNews(body: CreateNewDto, createdUser: User): Promise<Slider>;
    updateNews(id: number, body: UpdateNewDto, modifiedUser: User): Promise<Slider>;
    updatePartialNews(id: number, body: Partial<UpdateNewDto>, modifiedUser: User): Promise<Slider>;
    deleteNews(id: number, res: Response): Promise<void>;
}
