import { User } from './user.entity';
export declare class Customer {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    description: string;
    image: string;
    logo: string;
    icon: string;
    createdBy: User;
    modifiedBy: User;
}
