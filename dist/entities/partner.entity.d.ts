import { User } from './user.entity';
export declare class Partner {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    image: string;
    createdBy: User;
    modifiedBy: User;
}
