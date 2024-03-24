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
exports.bannersController = void 0;
const common_1 = require("@nestjs/common");
const banner_service_1 = require("./banner.service");
const create_banner_dto_1 = require("./dtos/create-banner.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const update_banner_dto_1 = require("./dtos/update-banner.dto");
const serialize_interceptor_1 = require("../../interceptors/serialize.interceptor");
const banner_1 = require("./dtos/banner");
const get_user_decorator_1 = require("../../auth/decorators/get-user.decorator");
const user_entity_1 = require("../../entities/user.entity");
let bannersController = class bannersController {
    constructor(banner) {
        this.banner = banner;
    }
    async getAllSliders(query) {
        return await this.banner.findAll(query);
    }
    async countAllSliders(query) {
        return await this.banner.countAll(query);
    }
    async getOneNews(id) {
        const result = await this.banner.findOne(id);
        if (!result) {
            throw new common_1.NotFoundException('Not found');
        }
        return result;
    }
    async createNews(body, createdUser) {
        return await this.banner.create(body);
    }
    async updateNews(id, body, modifiedUser) {
        return await this.banner.update(id, body, modifiedUser);
    }
    async updatePartialNews(id, body, modifiedUser) {
        return await this.banner.update(id, body, modifiedUser);
    }
    async deleteNews(id, res) {
        await this.banner.delete(id);
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.bannersController = bannersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "getAllSliders", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "countAllSliders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "getOneNews", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banner_dto_1.CreateBanner,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "createNews", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_banner_dto_1.UpdateNewDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "updatePartialNews", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], bannersController.prototype, "deleteNews", null);
exports.bannersController = bannersController = __decorate([
    (0, common_1.Controller)('banners'),
    (0, serialize_interceptor_1.Serialize)(banner_1.SliderDto),
    __metadata("design:paramtypes", [banner_service_1.BannersService])
], bannersController);
//# sourceMappingURL=banner.controller.js.map