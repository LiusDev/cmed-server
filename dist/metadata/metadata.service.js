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
exports.MetadataService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const metadata_entity_1 = require("../entities/metadata.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../utils");
let MetadataService = class MetadataService {
    constructor(repo) {
        this.repo = repo;
    }
    async getMetadata() {
        return (await this.repo.find())[0];
    }
    async upsert(metadata) {
        const haveMetadata = (await this.repo.find()).length > 0;
        if (!haveMetadata) {
            const newMetadata = this.repo.create(metadata);
            if (metadata.ceoImage)
                newMetadata.ceoImage = await (0, utils_1.toWebp)(metadata.ceoImage);
            if (metadata.quoteImage)
                newMetadata.quoteImage = await (0, utils_1.toWebp)(metadata.quoteImage);
            return await this.repo.save(newMetadata);
        }
        const metadataToUpdate = (await this.repo.find())[0];
        Object.assign(metadataToUpdate, metadata);
        if (metadata.ceoImage)
            metadataToUpdate.ceoImage = await (0, utils_1.toWebp)(metadata.ceoImage);
        if (metadata.quoteImage)
            metadataToUpdate.quoteImage = await (0, utils_1.toWebp)(metadata.quoteImage);
        return await this.repo.save(metadataToUpdate);
    }
};
exports.MetadataService = MetadataService;
exports.MetadataService = MetadataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metadata_entity_1.Metadata)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MetadataService);
//# sourceMappingURL=metadata.service.js.map