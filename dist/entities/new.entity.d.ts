import { User } from 'src/entities/user.entity';
import { Category } from './category.entity';
export declare class New {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    title: string;
    description: string;
    featuredImage: string;
    content: string;
    view: number;
    category: Category;
    createdBy: User;
    modifiedBy: User;
}
