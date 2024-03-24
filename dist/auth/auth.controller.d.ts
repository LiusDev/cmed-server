import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signIn(user: User): Promise<{
        user: {
            id: number;
            createdAt: Date;
            modifiedAt: Date;
            username: string;
            name: string;
            role: import("src/entities/user.entity").UserRole;
            createdCategories: import("../entities/category.entity").Category[];
            modifiedCategories: import("../entities/category.entity").Category[];
            createdNews: import("../entities/new.entity").New[];
            modifiedNews: import("../entities/new.entity").New[];
            createdDocuments: import("../entities/document.entity").Document[];
            modifiedDocuments: import("../entities/document.entity").Document[];
            createdProjects: import("../entities/project.entity").Project[];
            modifiedProjects: import("../entities/project.entity").Project[];
            createdStaffs: import("../entities/staff.entity").Staff[];
            modifiedStaffs: import("../entities/staff.entity").Staff[];
            createdServices: import("../entities/service.entity").Service[];
            modifiedServices: import("../entities/service.entity").Service[];
            createdPartners: import("../entities/partner.entity").Partner[];
            modifiedPartners: import("../entities/partner.entity").Partner[];
            createdCustomers: import("../entities/customer.entity").Customer[];
            modifiedCustomers: import("../entities/customer.entity").Customer[];
            createdRecruitments: import("../entities/recruitment.entity").Recruitment[];
            modifiedRecruitments: import("../entities/recruitment.entity").Recruitment[];
        };
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(user: User): Promise<{
        accessToken: string;
    }>;
    getProfile(user: User): Promise<User>;
}
