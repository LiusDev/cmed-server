import { UserRole } from 'src/entities/user.entity';
export declare class CreateUserDto {
    username: string;
    password: string;
    name: string;
    role: UserRole;
}
