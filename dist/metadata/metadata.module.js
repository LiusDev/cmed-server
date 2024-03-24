"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataModule = void 0;
const common_1 = require("@nestjs/common");
const metadata_controller_1 = require("./metadata.controller");
const metadata_service_1 = require("./metadata.service");
const typeorm_1 = require("@nestjs/typeorm");
const metadata_entity_1 = require("../entities/metadata.entity");
let MetadataModule = class MetadataModule {
};
exports.MetadataModule = MetadataModule;
exports.MetadataModule = MetadataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([metadata_entity_1.Metadata])],
        controllers: [metadata_controller_1.MetadataController],
        providers: [metadata_service_1.MetadataService],
    })
], MetadataModule);
//# sourceMappingURL=metadata.module.js.map