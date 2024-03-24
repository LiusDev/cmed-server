import { User } from './user.entity';
export declare class Staff {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    featuredImage: string;
    name: string;
    description: string;
    position: string;
    createdBy: User;
    modifiedBy: User;
}
