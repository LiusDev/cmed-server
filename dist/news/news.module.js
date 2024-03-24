"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsModule = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
const news_controller_1 = require("./news.controller");
const typeorm_1 = require("@nestjs/typeorm");
const new_entity_1 = require("../entities/new.entity");
const auth_module_1 = require("../auth/auth.module");
const images_module_1 = require("../images/images.module");
const categories_module_1 = require("../categories/categories.module");
let NewsModule = class NewsModule {
};
exports.NewsModule = NewsModule;
exports.NewsModule = NewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([new_entity_1.New]),
            auth_module_1.AuthModule,
            images_module_1.ImagesModule,
            categories_module_1.CategoriesModule,
        ],
        providers: [news_service_1.NewsService],
        controllers: [news_controller_1.NewsController],
    })
], NewsModule);
//# sourceMappingURL=news.module.js.map