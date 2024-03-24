import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Response } from 'express';
import { User } from 'src/entities/user.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(query: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/category.entity").Category[]>;
    findOne(id: number): Promise<import("../entities/category.entity").Category>;
    create(body: CreateCategoryDto, createdUser: User): Promise<import("../entities/category.entity").Category>;
    update(id: number, body: UpdateCategoryDto, modifiedUser: User): Promise<import("../entities/category.entity").Category>;
    partialUpdate(id: number, body: Partial<UpdateCategoryDto>, modifiedUser: User): Promise<import("../entities/category.entity").Category>;
    delete(id: number, res: Response): Promise<void>;
}
