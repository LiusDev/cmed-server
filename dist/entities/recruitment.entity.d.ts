import { User } from './user.entity';
export declare class Recruitment {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    title: string;
    deadline: Date;
    content: string;
    createdBy: User;
    modifiedBy: User;
}
