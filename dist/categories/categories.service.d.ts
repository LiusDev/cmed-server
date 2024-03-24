import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { User } from 'src/entities/user.entity';
export declare class CategoriesService {
    private readonly repo;
    constructor(repo: Repository<Category>);
    findAll({ name, page, perPage, sortBy, order, }: {
        name?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    create(newItem: CreateCategoryDto, createdUser: User): Promise<Category>;
    update(id: number, updateItem: UpdateCategoryDto | Partial<UpdateCategoryDto>, modifiedUser: User): Promise<Category>;
    delete(id: number): Promise<boolean>;
}
