import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from 'src/entities/user.entity';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Response } from 'express';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    findAll(query: {
        name?: string;
        description?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/project.entity").Project[]>;
    count(query: {
        name?: string;
        description?: string;
    }): Promise<number>;
    findOne(id: number): Promise<import("../entities/project.entity").Project>;
    create(body: CreateProjectDto, createdUser: User): Promise<import("../entities/project.entity").Project>;
    update(id: number, body: UpdateProjectDto, modifiedUser: User): Promise<import("../entities/project.entity").Project>;
    partialUpdate(id: number, body: Partial<UpdateProjectDto>, modifiedUser: User): Promise<import("../entities/project.entity").Project>;
    remove(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
