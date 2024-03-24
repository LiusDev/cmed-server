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
exports.MetadataController = void 0;
const common_1 = require("@nestjs/common");
const metadata_service_1 = require("./metadata.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const metadata_dto_1 = require("./dtos/metadata.dto");
let MetadataController = class MetadataController {
    constructor(metadataService) {
        this.metadataService = metadataService;
    }
    async getMetadataInfo() {
        return await this.metadataService.getMetadata();
    }
    async upsertMetadata(body) {
        return await this.metadataService.upsert(body);
    }
};
exports.MetadataController = MetadataController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "getMetadataInfo", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "upsertMetadata", null);
exports.MetadataController = MetadataController = __decorate([
    (0, common_1.Controller)('metadata'),
    (0, serialize_interceptor_1.Serialize)(metadata_dto_1.MetadataDto),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService])
], MetadataController);
//# sourceMappingURL=metadata.controller.js.map