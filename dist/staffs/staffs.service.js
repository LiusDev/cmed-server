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
exports.StaffsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_entity_1 = require("../entities/staff.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../utils");
let StaffsService = class StaffsService {
    constructor(repo) {
        this.repo = repo;
    }
    async findAll({ name, position, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                position: (0, typeorm_2.Like)(`%${position || ''}%`),
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
    async create(newStaff, createdUser) {
        const { name, position, featuredImage, description } = newStaff;
        const staff = this.repo.create({
            name,
            position,
            featuredImage: await (0, utils_1.toWebp)(featuredImage),
            description,
            createdBy: createdUser,
        });
        return await this.repo.save(staff);
    }
    async update(id, updateStaff, modifiedUser) {
        const staff = await this.repo.findOneBy({ id });
        if (!staff) {
            throw new common_1.NotFoundException('Staff not found');
        }
        Object.assign(staff, updateStaff);
        staff.modifiedBy = modifiedUser;
        if (updateStaff.featuredImage) {
            staff.featuredImage = await (0, utils_1.toWebp)(updateStaff.featuredImage);
        }
        return await this.repo.save(staff);
    }
    async remove(id) {
        const staff = await this.repo.findOneBy({ id });
        if (!staff) {
            throw new common_1.NotFoundException('Staff not found');
        }
        await this.repo.remove(staff);
    }
};
exports.StaffsService = StaffsService;
exports.StaffsService = StaffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffsService);
//# sourceMappingURL=staffs.service.js.map