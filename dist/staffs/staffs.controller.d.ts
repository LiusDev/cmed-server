import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
export declare class StaffsController {
    private readonly staffsService;
    constructor(staffsService: StaffsService);
    findAll(query: {
        name?: string;
        position?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/staff.entity").Staff[]>;
    findOne(id: number): Promise<import("../entities/staff.entity").Staff>;
    create(body: CreateStaffDto, createdUser: User): Promise<import("../entities/staff.entity").Staff>;
    update(id: number, body: CreateStaffDto, modifiedUser: User): Promise<import("../entities/staff.entity").Staff>;
    partialUpdate(id: number, body: Partial<CreateStaffDto>, modifiedUser: User): Promise<import("../entities/staff.entity").Staff>;
    remove(id: number, res: Response): Promise<void>;
}
