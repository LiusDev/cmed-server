/// <reference types="multer" />
import { Document } from 'src/entities/document.entity';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { User } from 'src/entities/user.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { ConfigService } from '@nestjs/config';
export declare class DocumentsService {
    private readonly repo;
    private readonly categoriesService;
    private readonly configService;
    constructor(repo: Repository<Document>, categoriesService: CategoriesService, configService: ConfigService);
    findAll({ name, description, category, page, perPage, sortBy, order, }: {
        name?: string;
        description?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Document[]>;
    countAll({ name, description, category, }: {
        name?: string;
        description?: string;
        category?: string;
    }): Promise<number>;
    findOne(id: number): Promise<Document>;
    create(newItem: CreateDocumentDto, file: Express.Multer.File, createdUser: User): Promise<Document>;
    update(id: number, file: Express.Multer.File, updateItem: UpdateDocumentDto | Partial<UpdateDocumentDto>, modifiedUser: User): Promise<Document>;
    delete(id: number): Promise<void>;
}
