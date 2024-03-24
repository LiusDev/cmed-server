import { ChildCategoryDto } from 'src/categories/dtos/child-category.dto';
export declare class DocumentDto {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    featuredImage: string;
    name: string;
    description: string;
    document: string;
    view: number;
    category: ChildCategoryDto;
}
