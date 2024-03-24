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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("../entities/service.entity");
const typeorm_2 = require("typeorm");
const images_service_1 = require("../images/images.service");
let ServicesService = class ServicesService {
    constructor(repo, imagesService) {
        this.repo = repo;
        this.imagesService = imagesService;
    }
    async findAll({ name, description, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                description: (0, typeorm_2.Like)(`%${description || ''}%`),
            },
            order: {
                [sortBy]: order.toUpperCase(),
            },
            skip: (validPage - 1) * validPerPage,
            take: validPerPage,
        });
    }
    async findOne(id) {
        return await this.repo.findOne({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: { id },
        });
    }
    async create(newItem, createdUser) {
        const { name, description, featuredImage, content } = newItem;
        const item = this.repo.create({
            name,
            description,
            featuredImage,
            content,
            createdBy: createdUser,
        });
        return await this.repo.save(item);
    }
    async update(id, updateItem, modifiedUser) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Service not found');
        }
        Object.assign(item, updateItem);
        item.modifiedBy = modifiedUser;
        return await this.repo.save(item);
    }
    async remove(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Service not found');
        }
        await this.repo.remove(item);
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        images_service_1.ImagesService])
], ServicesService);
//# sourceMappingURL=services.service.js.map