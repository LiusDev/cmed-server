import { Staff } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dtos/create-staff.dto';
import { User } from 'src/entities/user.entity';
import { UpdateStaffDto } from './dtos/update-staff.dto';
export declare class StaffsService {
    private readonly repo;
    constructor(repo: Repository<Staff>);
    findAll({ name, position, page, perPage, sortBy, order, }: {
        name?: string;
        position?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Staff[]>;
    findOne(id: number): Promise<Staff>;
    create(newStaff: CreateStaffDto, createdUser: User): Promise<Staff>;
    update(id: number, updateStaff: UpdateStaffDto | Partial<UpdateStaffDto>, modifiedUser: User): Promise<Staff>;
    remove(id: number): Promise<void>;
}
