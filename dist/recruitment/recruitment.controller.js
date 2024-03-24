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
exports.RecruitmentController = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const recruitment_dto_1 = require("./dtos/recruitment.dto");
const recruitment_service_1 = require("./recruitment.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const create_recruitment_dto_1 = require("./dtos/create-recruitment.dto");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_entity_1 = require("../entities/user.entity");
const update_recruitment_dto_1 = require("./dtos/update-recruitment.dto");
let RecruitmentController = class RecruitmentController {
    constructor(recruitmentService) {
        this.recruitmentService = recruitmentService;
    }
    async findAll(query) {
        return await this.recruitmentService.findAll(query);
    }
    async count(query) {
        return await this.recruitmentService.count(query);
    }
    async findOne(id) {
        return await this.recruitmentService.findOne(id);
    }
    async create(body, createdUser) {
        return await this.recruitmentService.create(body, createdUser);
    }
    async update(id, body, modifiedUser) {
        return await this.recruitmentService.update(id, body, modifiedUser);
    }
    async updateStatus(id, body, modifiedUser) {
        return await this.recruitmentService.update(id, body, modifiedUser);
    }
    async delete(id, res) {
        await this.recruitmentService.remove(id);
        return res.status(common_1.HttpStatus.NO_CONTENT).send();
    }
};
exports.RecruitmentController = RecruitmentController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(':id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recruitment_dto_1.CreateRecruitmentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_recruitment_dto_1.UpdateRecruitmentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RecruitmentController.prototype, "delete", null);
exports.RecruitmentController = RecruitmentController = __decorate([
    (0, common_1.Controller)('recruitment'),
    (0, serialize_interceptor_1.Serialize)(recruitment_dto_1.RecruitmentDto),
    __metadata("design:paramtypes", [recruitment_service_1.RecruitmentService])
], RecruitmentController);
//# sourceMappingURL=recruitment.controller.js.map