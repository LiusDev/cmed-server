/// <reference types="multer" />
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
import { UpdateDocumentDto } from './dtos/update-document.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    findAll(query: {
        name?: string;
        description?: string;
        category?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/document.entity").Document[]>;
    countAll(query: {
        name?: string;
        description?: string;
        category?: string;
    }): Promise<number>;
    findOne(id: number): Promise<import("../entities/document.entity").Document>;
    create(file: Express.Multer.File, body: CreateDocumentDto, createdUser: User): Promise<import("../entities/document.entity").Document>;
    update(id: number, file: Express.Multer.File, body: UpdateDocumentDto, modifiedUser: User): Promise<import("../entities/document.entity").Document>;
    updatePartial(id: number, file: Express.Multer.File, body: Partial<UpdateDocumentDto>, modifiedUser: User): Promise<import("../entities/document.entity").Document>;
    delete(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
