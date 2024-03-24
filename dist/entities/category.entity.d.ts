import { User } from './user.entity';
import { New } from './new.entity';
import { Document } from './document.entity';
export declare class Category {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    news: New[];
    documents: Document[];
    createdBy: User;
    modifiedBy: User;
}
