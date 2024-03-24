"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_entity_1 = require("../entities/document.entity");
const typeorm_2 = require("typeorm");
const categories_service_1 = require("../categories/categories.service");
const path_1 = require("path");
const fs_1 = require("fs");
const config_1 = require("@nestjs/config");
const utils_1 = require("../utils");
let DocumentsService = class DocumentsService {
    constructor(repo, categoriesService, configService) {
        this.repo = repo;
        this.categoriesService = categoriesService;
        this.configService = configService;
    }
    async findAll({ name, description, category, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        const validCategory = parseInt(category) || 0;
        return await this.repo.find({
            relations: {
                category: true,
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                description: (0, typeorm_2.Like)(`%${description || ''}%`),
                ...(validCategory ? { category: { id: validCategory } } : {}),
            },
            order: {
                [sortBy]: order.toUpperCase(),
            },
            skip: (validPage - 1) * validPerPage,
            take: validPerPage,
        });
    }
    async countAll({ name, description, category, }) {
        const validCategory = parseInt(category) || 0;
        return await this.repo.count({
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                description: (0, typeorm_2.Like)(`%${description || ''}%`),
                ...(validCategory ? { category: { id: validCategory } } : {}),
            },
        });
    }
    async findOne(id) {
        return await this.repo.findOne({
            relations: {
                category: true,
                createdBy: true,
                modifiedBy: true,
            },
            where: { id },
        });
    }
    async create(newItem, file, createdUser) {
        const { name, description, categoryId } = newItem;
        const category = await this.categoriesService.findOne(categoryId);
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', file.originalname);
        const apiUrl = this.configService.get('API_URL');
        const fileUrl = `${apiUrl}/uploads/${file.originalname}`;
        await fs_1.promises.writeFile(filePath, file.buffer);
        const item = this.repo.create({
            name,
            description,
            document: fileUrl,
            featuredImage: await (0, utils_1.toWebp)(newItem.featuredImage),
            category,
            createdBy: createdUser,
        });
        return await this.repo.save(item);
    }
    async update(id, file, updateItem, modifiedUser) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Document not found');
        }
        const { categoryId, ...rest } = updateItem;
        if (categoryId) {
            const category = await this.categoriesService.findOne(categoryId);
            if (!category) {
                throw new common_1.NotFoundException('Category not found');
            }
            item.category = category;
        }
        if (file) {
            const url = new URL(item.document);
            const fileName = url.pathname.split('/').pop();
            const oldFilePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', fileName);
            await fs_1.promises.unlink(oldFilePath);
            const newFilePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', file.originalname);
            await fs_1.promises.writeFile(newFilePath, file.buffer);
            const apiUrl = this.configService.get('API_URL');
            const fileUrl = `${apiUrl}/uploads/${file.originalname}`;
            item.document = fileUrl;
        }
        Object.assign(item, rest);
        if (updateItem.featuredImage) {
            item.featuredImage = await (0, utils_1.toWebp)(updateItem.featuredImage);
        }
        item.modifiedBy = modifiedUser;
        return await this.repo.save(item);
    }
    async delete(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Document not found');
        }
        const url = new URL(item.document);
        const fileName = url.pathname.split('/').pop();
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', fileName);
        await fs_1.promises.unlink(filePath);
        await this.repo.remove(item);
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_entity_1.Document)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        config_1.ConfigService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map