import { Category } from './category.entity';
import { User } from './user.entity';
export declare class Document {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    featuredImage: string;
    logo: string;
    name: string;
    description: string;
    document: string;
    view: number;
    category: Category;
    createdBy: User;
    modifiedBy: User;
}
