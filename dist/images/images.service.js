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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const sharp_1 = require("sharp");
const stream_1 = require("stream");
let ImagesService = class ImagesService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadBase64Image(folder, image) {
        const base64Data = image.split(',')[1];
        const imageBuffer = await (0, sharp_1.default)(Buffer.from(base64Data, 'base64')).webp().toBuffer();
        return new Promise((res, rej) => {
            const theTransformStream = cloudinary_1.v2.uploader.upload_stream({
                folder,
            }, (err, result) => {
                if (err)
                    return rej(err);
                res(result.url);
            });
            let str = stream_1.Readable.from(imageBuffer);
            str.pipe(theTransformStream);
        });
    }
    getPublicIdFromUrl(imageUrl) {
        const splitUrl = imageUrl.split('/');
        const folderName = splitUrl[splitUrl.length - 2];
        const publicIdWithExtension = splitUrl[splitUrl.length - 1];
        const publicId = folderName + '/' + publicIdWithExtension.split('.')[0];
        return publicId;
    }
    async deleteImage(imageUrl) {
        const publicId = this.getPublicIdFromUrl(imageUrl);
        return await cloudinary_1.v2.api.delete_resources([publicId], {
            type: 'upload',
            resource_type: 'image',
        });
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImagesService);
//# sourceMappingURL=images.service.js.map