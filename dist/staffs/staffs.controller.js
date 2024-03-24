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
exports.StaffsController = void 0;
const common_1 = require("@nestjs/common");
const staffs_service_1 = require("./staffs.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_staff_dto_1 = require("./dtos/create-staff.dto");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_entity_1 = require("../entities/user.entity");
let StaffsController = class StaffsController {
    constructor(staffsService) {
        this.staffsService = staffsService;
    }
    async findAll(query) {
        return await this.staffsService.findAll(query);
    }
    async findOne(id) {
        return await this.staffsService.findOne(id);
    }
    async create(body, createdUser) {
        return await this.staffsService.create(body, createdUser);
    }
    async update(id, body, modifiedUser) {
        return await this.staffsService.update(id, body, modifiedUser);
    }
    async partialUpdate(id, body, modifiedUser) {
        return await this.staffsService.update(id, body, modifiedUser);
    }
    async remove(id, res) {
        await this.staffsService.remove(id);
        res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.StaffsController = StaffsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_staff_dto_1.CreateStaffDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_staff_dto_1.CreateStaffDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "partialUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "remove", null);
exports.StaffsController = StaffsController = __decorate([
    (0, common_1.Controller)('staffs'),
    __metadata("design:paramtypes", [staffs_service_1.StaffsService])
], StaffsController);
//# sourceMappingURL=staffs.controller.js.map