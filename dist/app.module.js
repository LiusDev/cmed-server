"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const news_module_1 = require("./news/news.module");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const images_module_1 = require("./images/images.module");
const config_1 = require("@nestjs/config");
const new_entity_1 = require("./entities/new.entity");
const user_entity_1 = require("./entities/user.entity");
const category_entity_1 = require("./entities/category.entity");
const contact_entity_1 = require("./entities/contact.entity");
const customer_entity_1 = require("./entities/customer.entity");
const document_entity_1 = require("./entities/document.entity");
const metadata_entity_1 = require("./entities/metadata.entity");
const partner_entity_1 = require("./entities/partner.entity");
const project_entity_1 = require("./entities/project.entity");
const service_entity_1 = require("./entities/service.entity");
const staff_entity_1 = require("./entities/staff.entity");
const categories_module_1 = require("./categories/categories.module");
const documents_module_1 = require("./documents/documents.module");
const partners_module_1 = require("./partners/partners.module");
const projects_module_1 = require("./projects/projects.module");
const services_module_1 = require("./services/services.module");
const staffs_module_1 = require("./staffs/staffs.module");
const customers_module_1 = require("./customers/customers.module");
const metadata_module_1 = require("./metadata/metadata.module");
const contacts_module_1 = require("./contacts/contacts.module");
const recruitment_module_1 = require("./recruitment/recruitment.module");
const recruitment_entity_1 = require("./entities/recruitment.entity");
const slider_entity_1 = require("./entities/slider.entity");
const slider_module_1 = require("./slider/slider.module");
const banner_entity_1 = require("./entities/banner.entity");
const banner_module_1 = require("./banner/slider/banner.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [
                    category_entity_1.Category,
                    contact_entity_1.Contact,
                    customer_entity_1.Customer,
                    document_entity_1.Document,
                    metadata_entity_1.Metadata,
                    new_entity_1.New,
                    partner_entity_1.Partner,
                    project_entity_1.Project,
                    service_entity_1.Service,
                    staff_entity_1.Staff,
                    user_entity_1.User,
                    recruitment_entity_1.Recruitment,
                    slider_entity_1.Slider,
                    banner_entity_1.Banner
                ],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            news_module_1.NewsModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            images_module_1.ImagesModule,
            documents_module_1.DocumentsModule,
            categories_module_1.CategoriesModule,
            partners_module_1.PartnersModule,
            projects_module_1.ProjectsModule,
            services_module_1.ServicesModule,
            staffs_module_1.StaffsModule,
            customers_module_1.CustomersModule,
            metadata_module_1.MetadataModule,
            contacts_module_1.ContactsModule,
            recruitment_module_1.RecruitmentModule,
            slider_module_1.SlidersModule,
            banner_module_1.BannersModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map