import { ChildCategoryDto } from 'src/categories/dtos/child-category.dto';
export declare class NewDto {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    title: string;
    description: string;
    featuredImage: string;
    content: string;
    view: number;
    category: ChildCategoryDto;
}
