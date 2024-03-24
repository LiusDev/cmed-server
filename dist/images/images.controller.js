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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const images_service_1 = require("./images.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const upload_image_dto_1 = require("./dtos/upload-image.dto");
const delete_image_dto_1 = require("./dtos/delete-image.dto");
const utils_1 = require("../utils");
let ImagesController = class ImagesController {
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    async uploadImage(folder, body) {
        const result = await this.imagesService.uploadBase64Image(folder, await (0, utils_1.toWebp)(body.file));
        console.log(result);
    }
    async deleteImage(body) {
        const result = await this.imagesService.deleteImage(body.url);
        console.log(result);
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Post)(':folder'),
    __param(0, (0, common_1.Param)('folder')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, upload_image_dto_1.UploadImageDto]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_image_dto_1.DeleteImageDto]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "deleteImage", null);
exports.ImagesController = ImagesController = __decorate([
    (0, common_1.Controller)('images'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map