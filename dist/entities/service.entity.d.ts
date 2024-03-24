import { User } from './user.entity';
export declare class Service {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    description: string;
    featuredImage: string;
    content: string;
    createdBy: User;
    modifiedBy: User;
}
