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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_entity_1 = require("../entities/contact.entity");
const typeorm_2 = require("typeorm");
let ContactsService = class ContactsService {
    constructor(repo) {
        this.repo = repo;
    }
    async getContacts({ name, phone, email, company, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            where: {
                name: (0, typeorm_2.Like)(`%${name || ''}%`),
                phone: (0, typeorm_2.Like)(`%${phone || ''}%`),
                email: (0, typeorm_2.Like)(`%${email || ''}%`),
                company: (0, typeorm_2.Like)(`%${company || ''}%`),
            },
            order: {
                [sortBy]: order.toUpperCase(),
            },
            skip: (validPage - 1) * validPerPage,
            take: validPerPage,
        });
    }
    async getContact(id) {
        return await this.repo.findOneBy({ id });
    }
    async createContact(contact) {
        const { name, company, phone, email, customerType, content } = contact;
        const newContact = this.repo.create();
        Object.assign(newContact, { name, company, phone, email, customerType, content });
        return await this.repo.save(newContact);
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map