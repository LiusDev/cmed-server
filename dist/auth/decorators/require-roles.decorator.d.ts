import { UserRole } from 'src/entities/user.entity';
export declare const ROLES_KEY = "roles";
export declare const RequireRoles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
