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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        const admin = await this.repo.findOne({ where: { role: user_entity_1.UserRole.ADMIN } });
        if (!admin) {
            await this.create({
                username: 'admin',
                password: 'admin',
                name: 'Admin',
                role: user_entity_1.UserRole.ADMIN,
            });
        }
    }
    async findAll({ username, name, page = '1', perPage = '10', sortBy = 'id', order = 'DESC', }) {
        const validPage = parseInt(page) || 1;
        const validPerPage = parseInt(perPage) || 10;
        return await this.repo.find({
            where: {
                username: username ? (0, typeorm_2.Like)(`%${username}%`) : undefined,
                name: name ? (0, typeorm_2.Like)(`%${name}%`) : undefined,
            },
            order: {
                [sortBy]: order.toUpperCase(),
            },
            skip: (validPage - 1) * validPerPage,
            take: validPerPage,
        });
    }
    async findOne(id) {
        return await this.repo.findOneBy({ id });
    }
    async findOneByUsername(username) {
        return await this.repo.findOneBy({ username });
    }
    async create(user) {
        const { username, password, name, role } = user;
        const checkUser = await this.findOneByUsername(username);
        if (checkUser) {
            throw new common_1.ConflictException('Username already exists');
        }
        const newUser = this.repo.create({
            username,
            password,
            name,
            role,
        });
        return await this.repo.save(newUser);
    }
    async update(id, attrs) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Cannot update admin user');
        }
        Object.assign(user, attrs);
        return await this.repo.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Cannot delete admin user');
        }
        await this.repo.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map