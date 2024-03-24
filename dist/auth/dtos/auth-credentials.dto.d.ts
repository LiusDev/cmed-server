import { UserRole } from 'src/entities/user.entity';
export declare class AuthCredentialsDto {
    username: string;
    password: string;
    name: string;
    role: UserRole;
}
