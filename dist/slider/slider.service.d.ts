import { Repository } from 'typeorm';
import { CreateNewDto } from './dtos/create-slider.dto';
import { UpdateNewDto } from './dtos/update-slider.dto';
import { User } from 'src/entities/user.entity';
import { ImagesService } from 'src/images/images.service';
import { Slider } from '../entities/slider.entity';
export declare class SlidersService {
    private readonly repo;
    private readonly imagesService;
    constructor(repo: Repository<Slider>, imagesService: ImagesService);
    findAll({ title, description, page, perPage, sortBy, order, }: {
        title?: string;
        description?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Slider[]>;
    countAll({ title, description, category, }: {
        title?: string;
        description?: string;
        category?: string;
    }): Promise<number>;
    findOne(id: number): Promise<Slider>;
    create(newItem: CreateNewDto, createdUser: User): Promise<Slider>;
    update(id: number, updateNew: UpdateNewDto | Partial<UpdateNewDto>, modifiedUser: User): Promise<Slider>;
    delete(id: number): Promise<void>;
}
