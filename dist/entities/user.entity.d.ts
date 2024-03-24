import { New } from './new.entity';
import { Category } from './category.entity';
import { Document } from './document.entity';
import { Project } from './project.entity';
import { Staff } from './staff.entity';
import { Service } from './service.entity';
import { Partner } from './partner.entity';
import { Customer } from './customer.entity';
import { Recruitment } from './recruitment.entity';
export declare enum UserRole {
    STAFF = "staff",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    createdAt: Date;
    modifiedAt: Date;
    username: string;
    password: string;
    name: string;
    role: UserRole;
    createdCategories: Category[];
    modifiedCategories: Category[];
    createdNews: New[];
    modifiedNews: New[];
    createdDocuments: Document[];
    modifiedDocuments: Document[];
    createdProjects: Project[];
    modifiedProjects: Project[];
    createdStaffs: Staff[];
    modifiedStaffs: Staff[];
    createdServices: Service[];
    modifiedServices: Service[];
    createdPartners: Partner[];
    modifiedPartners: Partner[];
    createdCustomers: Customer[];
    modifiedCustomers: Customer[];
    createdRecruitments: Recruitment[];
    modifiedRecruitments: Recruitment[];
}
