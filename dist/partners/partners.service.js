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
exports.PartnersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const partner_entity_1 = require("../entities/partner.entity");
const typeorm_2 = require("typeorm");
const images_service_1 = require("../images/images.service");
const utils_1 = require("../utils");
let PartnersService = class PartnersService {
    constructor(repo, imagesService) {
        this.repo = repo;
        this.imagesService = imagesService;
    }
    async findAll({ name, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            relations: {
                createdBy: true,
                modifiedBy: true,
            },
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
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
    async create(partner, createdUser) {
        const { name, image } = partner;
        const newPartner = this.repo.create({
            name,
            image: await (0, utils_1.toWebp)(image),
            createdBy: createdUser,
        });
        return await this.repo.save(newPartner);
    }
    async update(id, partner, modifiedUser) {
        const partnerToUpdate = await this.repo.findOneBy({ id });
        if (!partnerToUpdate) {
            throw new common_1.NotFoundException('Partner not found');
        }
        Object.assign(partnerToUpdate, partner);
        if (partner.image) {
            partnerToUpdate.image = await (0, utils_1.toWebp)(partner.image);
        }
        partnerToUpdate.modifiedBy = modifiedUser;
        return await this.repo.save(partnerToUpdate);
    }
    async delete(id) {
        const partnerToDelete = await this.repo.findOneBy({ id });
        if (!partnerToDelete) {
            throw new common_1.NotFoundException('Partner not found');
        }
        await this.repo.remove(partnerToDelete);
    }
};
exports.PartnersService = PartnersService;
exports.PartnersService = PartnersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(partner_entity_1.Partner)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        images_service_1.ImagesService])
], PartnersService);
//# sourceMappingURL=partners.service.js.map