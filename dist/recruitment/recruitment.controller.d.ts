import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dtos/create-recruitment.dto';
import { User } from 'src/entities/user.entity';
import { UpdateRecruitmentDto } from './dtos/update-recruitment.dto';
import { Response } from 'express';
export declare class RecruitmentController {
    private readonly recruitmentService;
    constructor(recruitmentService: RecruitmentService);
    findAll(query: {
        title?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/recruitment.entity").Recruitment[]>;
    count(query: {
        title?: string;
    }): Promise<number>;
    findOne(id: number): Promise<import("../entities/recruitment.entity").Recruitment>;
    create(body: CreateRecruitmentDto, createdUser: User): Promise<import("../entities/recruitment.entity").Recruitment>;
    update(id: number, body: UpdateRecruitmentDto, modifiedUser: User): Promise<import("../entities/recruitment.entity").Recruitment>;
    updateStatus(id: number, body: Partial<UpdateRecruitmentDto>, modifiedUser: User): Promise<import("../entities/recruitment.entity").Recruitment>;
    delete(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
