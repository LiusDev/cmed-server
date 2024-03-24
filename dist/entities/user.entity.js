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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const new_entity_1 = require("./new.entity");
const category_entity_1 = require("./category.entity");
const document_entity_1 = require("./document.entity");
const project_entity_1 = require("./project.entity");
const staff_entity_1 = require("./staff.entity");
const service_entity_1 = require("./service.entity");
const partner_entity_1 = require("./partner.entity");
const customer_entity_1 = require("./customer.entity");
const recruitment_entity_1 = require("./recruitment.entity");
var UserRole;
(function (UserRole) {
    UserRole["STAFF"] = "staff";
    UserRole["ADMIN"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "modifiedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: UserRole.STAFF }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (categories) => categories.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => category_entity_1.Category, (categories) => categories.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedCategories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => new_entity_1.New, (news) => news.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdNews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => new_entity_1.New, (news) => news.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedNews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (documents) => documents.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdDocuments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => document_entity_1.Document, (documents) => documents.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedDocuments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (projects) => projects.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => project_entity_1.Project, (projects) => projects.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedProjects", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.Staff, (staffs) => staffs.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdStaffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_entity_1.Staff, (staffs) => staffs.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedStaffs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (services) => services.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdServices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (services) => services.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedServices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partner_entity_1.Partner, (partners) => partners.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdPartners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => partner_entity_1.Partner, (partners) => partners.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedPartners", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, (customers) => customers.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdCustomers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, (customers) => customers.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedCustomers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recruitment_entity_1.Recruitment, (recruitment) => recruitment.createdBy),
    __metadata("design:type", Array)
], User.prototype, "createdRecruitments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => recruitment_entity_1.Recruitment, (recruitment) => recruitment.modifiedBy),
    __metadata("design:type", Array)
], User.prototype, "modifiedRecruitments", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map