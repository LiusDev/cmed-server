import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { New } from './new.entity';
import { Category } from './category.entity';
import { Document } from './document.entity';
import { Project } from './project.entity';
import { Staff } from './staff.entity';
import { Service } from './service.entity';
import { Partner } from './partner.entity';
import { Customer } from './customer.entity';
import { Recruitment } from './recruitment.entity';
import { Setting } from './setting.entity';

export enum UserRole {
  STAFF = 'staff',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: UserRole.STAFF })
  role: UserRole;

  @OneToMany(() => Category, (categories) => categories.createdBy)
  createdCategories: Category[];

  @OneToMany(() => Category, (categories) => categories.modifiedBy)
  modifiedCategories: Category[];

  @OneToMany(() => New, (news) => news.createdBy)
  createdNews: New[];

  @OneToMany(() => New, (news) => news.modifiedBy)
  modifiedNews: New[];

  @OneToMany(() => Document, (documents) => documents.createdBy)
  createdDocuments: Document[];

  @OneToMany(() => Document, (documents) => documents.modifiedBy)
  modifiedDocuments: Document[];

  @OneToMany(() => Project, (projects) => projects.createdBy)
  createdProjects: Project[];

  @OneToMany(() => Project, (projects) => projects.modifiedBy)
  modifiedProjects: Project[];

  @OneToMany(() => Staff, (staffs) => staffs.createdBy)
  createdStaffs: Staff[];

  @OneToMany(() => Staff, (staffs) => staffs.modifiedBy)
  modifiedStaffs: Staff[];

  @OneToMany(() => Service, (services) => services.createdBy)
  createdServices: Service[];

  @OneToMany(() => Service, (services) => services.modifiedBy)
  modifiedServices: Service[];

  @OneToMany(() => Partner, (partners) => partners.createdBy)
  createdPartners: Partner[];

  @OneToMany(() => Partner, (partners) => partners.modifiedBy)
  modifiedPartners: Partner[];

  @OneToMany(() => Customer, (customers) => customers.createdBy)
  createdCustomers: Customer[];

  @OneToMany(() => Customer, (customers) => customers.modifiedBy)
  modifiedCustomers: Customer[];

  @OneToMany(() => Recruitment, (recruitment) => recruitment.createdBy)
  createdRecruitments: Recruitment[];

  @OneToMany(() => Recruitment, (recruitment) => recruitment.modifiedBy)
  modifiedRecruitments: Recruitment[];
  @OneToMany(() => Setting, (settings) => settings.createdBy)
  createdSettings: Setting
  @OneToMany(() => Setting, (settings) => settings.modifiedBy)
  modifiedSettings: Setting
}
