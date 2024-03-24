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
exports.slidersController = void 0;
const common_1 = require("@nestjs/common");
const slider_service_1 = require("./slider.service");
const create_slider_dto_1 = require("./dtos/create-slider.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_slider_dto_1 = require("./dtos/update-slider.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const slider_1 = require("./dtos/slider");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_entity_1 = require("../entities/user.entity");
let slidersController = class slidersController {
    constructor(slidersService) {
        this.slidersService = slidersService;
    }
    async getAllSliders(query) {
        return await this.slidersService.findAll(query);
    }
    async countAllSliders(query) {
        return await this.slidersService.countAll(query);
    }
    async getOneNews(id) {
        const result = await this.slidersService.findOne(id);
        if (!result) {
            throw new common_1.NotFoundException('Not found');
        }
        return result;
    }
    async createNews(body, createdUser) {
        return await this.slidersService.create(body, createdUser);
    }
    async updateNews(id, body, modifiedUser) {
        return await this.slidersService.update(id, body, modifiedUser);
    }
    async updatePartialNews(id, body, modifiedUser) {
        return await this.slidersService.update(id, body, modifiedUser);
    }
    async deleteNews(id, res) {
        await this.slidersService.delete(id);
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.slidersController = slidersController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "getAllSliders", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "countAllSliders", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "getOneNews", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_slider_dto_1.CreateNewDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "createNews", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_slider_dto_1.UpdateNewDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "updateNews", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "updatePartialNews", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], slidersController.prototype, "deleteNews", null);
exports.slidersController = slidersController = __decorate([
    (0, common_1.Controller)('sliders'),
    (0, serialize_interceptor_1.Serialize)(slider_1.SliderDto),
    __metadata("design:paramtypes", [slider_service_1.SlidersService])
], slidersController);
//# sourceMappingURL=slider.controller.js.map