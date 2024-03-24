import { DocumentDto } from 'src/documents/dtos/document.dto';
import { NewDto } from 'src/news/dtos/new.dto';
export declare class CategoryDto {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    news: NewDto;
    documents: DocumentDto;
}
