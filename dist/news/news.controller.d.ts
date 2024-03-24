import { NewsService } from './news.service';
import { New } from '../entities/new.entity';
import { CreateNewDto } from './dtos/create-new.dto';
import { UpdateNewDto } from './dtos/update-new.dto';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    getAllNews(query: {
        title?: string;
        description?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<New[]>;
    countAllNews(query: {
        title?: string;
        description?: string;
        category?: string;
    }): Promise<number>;
    getOneNews(id: number): Promise<New>;
    createNews(body: CreateNewDto, createdUser: User): Promise<New>;
    updateNews(id: number, body: UpdateNewDto, modifiedUser: User): Promise<New>;
    updatePartialNews(id: number, body: Partial<UpdateNewDto>, modifiedUser: User): Promise<New>;
    deleteNews(id: number, res: Response): Promise<void>;
}
