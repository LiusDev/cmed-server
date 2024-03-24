import { Project } from 'src/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from 'src/entities/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
export declare class ProjectsService {
    private readonly repo;
    constructor(repo: Repository<Project>);
    findAll({ name, description, page, perPage, sortBy, order, }: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Project[]>;
    count({ name, description, }: {
        name?: string;
        description?: string;
    }): Promise<number>;
    findOne(id: number): Promise<Project>;
    create(newItem: CreateProjectDto, createdUser: User): Promise<Project>;
    update(id: number, updateItem: UpdateProjectDto | Partial<UpdateProjectDto>, modifiedUser: User): Promise<Project>;
    remove(id: number): Promise<void>;
}
