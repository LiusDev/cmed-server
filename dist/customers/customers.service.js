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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../entities/customer.entity");
const typeorm_2 = require("typeorm");
const images_service_1 = require("../images/images.service");
const utils_1 = require("../utils");
let CustomersService = class CustomersService {
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
    async create(customer, createdUser) {
        const { name, image, description, logo, icon } = customer;
        const newCustomer = this.repo.create({
            name,
            image: await (0, utils_1.toWebp)(image),
            logo: await (0, utils_1.toWebp)(logo),
            icon: await (0, utils_1.toWebp)(icon),
            description,
            createdBy: createdUser,
        });
        return await this.repo.save(newCustomer);
    }
    async update(id, customer, modifiedUser) {
        const customerToUpdate = await this.repo.findOneBy({ id });
        if (!customerToUpdate) {
            throw new common_1.NotFoundException('Customer not found');
        }
        Object.assign(customerToUpdate, customer);
        if (customer.image) {
            customerToUpdate.image = await (0, utils_1.toWebp)(customer.image);
        }
        if (customer.logo) {
            customerToUpdate.logo = await (0, utils_1.toWebp)(customer.logo);
        }
        if (customer.icon) {
            customerToUpdate.icon = await (0, utils_1.toWebp)(customer.icon);
        }
        customerToUpdate.modifiedBy = modifiedUser;
        return await this.repo.save(customerToUpdate);
    }
    async remove(id) {
        const customerToDelete = await this.repo.findOneBy({ id });
        if (!customerToDelete) {
            throw new common_1.NotFoundException('Customer not found');
        }
        await this.repo.remove(customerToDelete);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        images_service_1.ImagesService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map