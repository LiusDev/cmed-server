import { New } from '../entities/new.entity';
import { Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-new.dto';
import { UpdateNewDto } from './dtos/update-new.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
export declare class NewsService {
    private readonly repo;
    private readonly imagesService;
    private readonly categoriesService;
    constructor(repo: Repository<New>, imagesService: ImagesService, categoriesService: CategoriesService);
    findAll({ title, description, category, page, perPage, sortBy, order, }: {
        title?: string;
        description?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<New[]>;
    countAll({ title, description, category, }: {
        title?: string;
        description?: string;
        category?: string;
    }): Promise<number>;
    findOne(id: number): Promise<New>;
    create(newItem: CreateNewDto, createdUser: User): Promise<New>;
    update(id: number, updateNew: UpdateNewDto | Partial<UpdateNewDto>, modifiedUser: User): Promise<New>;
    delete(id: number): Promise<void>;
}
