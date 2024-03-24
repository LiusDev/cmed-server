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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("../entities/project.entity");
const typeorm_2 = require("typeorm");
let ProjectsService = class ProjectsService {
    constructor(repo) {
        this.repo = repo;
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
    async count({ name, description, }) {
        return await this.repo.count({
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                description: (0, typeorm_2.Like)(`%${description || ''}%`),
            },
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
            throw new common_1.NotFoundException('Project not found');
        }
        Object.assign(item, updateItem);
        item.modifiedBy = modifiedUser;
        return await this.repo.save(item);
    }
    async remove(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Project not found');
        }
        await this.repo.remove(item);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map