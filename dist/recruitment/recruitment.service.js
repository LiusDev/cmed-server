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
exports.RecruitmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const recruitment_entity_1 = require("../entities/recruitment.entity");
const typeorm_2 = require("typeorm");
let RecruitmentService = class RecruitmentService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll({ title, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                title: (0, typeorm_2.Like)(`%${title || ''}%`),
            },
            order: {
                [sortBy]: order.toUpperCase(),
            },
            skip: (validPage - 1) * validPerPage,
            take: validPerPage,
        });
    }
    async count({ title }) {
        return await this.repo.count({
            where: {
                title: title,
            },
        });
    }
    async findOne(id) {
        return await this.repo.findOne({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                id: id,
            },
        });
    }
    async create(newRecruitment, createdUser) {
        const { title, deadline, content } = newRecruitment;
        const recruitment = this.repo.create({
            title,
            deadline,
            content,
            createdBy: createdUser,
        });
        return await this.repo.save(recruitment);
    }
    async update(id, updatedRecruitment, modifiedUser) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Recruitment not found');
        }
        Object.assign(item, updatedRecruitment);
        item.modifiedBy = modifiedUser;
        return await this.repo.save(item);
    }
    async remove(id) {
        const item = await this.repo.findOneBy({ id });
        if (!item) {
            throw new common_1.NotFoundException('Recruitment not found');
        }
        await this.repo.remove(item);
    }
};
exports.RecruitmentService = RecruitmentService;
exports.RecruitmentService = RecruitmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recruitment_entity_1.Recruitment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecruitmentService);
//# sourceMappingURL=recruitment.service.js.map