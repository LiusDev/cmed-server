import { Recruitment } from 'src/entities/recruitment.entity';
import { Repository } from 'typeorm';
import { CreateRecruitmentDto } from './dtos/create-recruitment.dto';
import { User } from 'src/entities/user.entity';
import { UpdateRecruitmentDto } from './dtos/update-recruitment.dto';
export declare class RecruitmentService {
    private readonly repo;
    constructor(repo: Repository<Recruitment>);
    findAll({ title, page, perPage, sortBy, order, }: {
        title?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Recruitment[]>;
    count({ title }: {
        title?: string;
    }): Promise<number>;
    findOne(id: number): Promise<Recruitment>;
    create(newRecruitment: CreateRecruitmentDto, createdUser: User): Promise<Recruitment>;
    update(id: number, updatedRecruitment: UpdateRecruitmentDto | Partial<UpdateRecruitmentDto>, modifiedUser: User): Promise<Recruitment>;
    remove(id: number): Promise<void>;
}
