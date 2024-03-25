import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
import { New } from './entities/new.entity';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Contact } from './entities/contact.entity';
import { Customer } from './entities/customer.entity';
import { Document } from './entities/document.entity';
import { Metadata } from './entities/metadata.entity';
import { Partner } from './entities/partner.entity';
import { Project } from './entities/project.entity';
import { Service } from './entities/service.entity';
import { Staff } from './entities/staff.entity';
import { CategoriesModule } from './categories/categories.module';
import { DocumentsModule } from './documents/documents.module';
import { PartnersModule } from './partners/partners.module';
import { ProjectsModule } from './projects/projects.module';
import { ServicesModule } from './services/services.module';
import { StaffsModule } from './staffs/staffs.module';
import { CustomersModule } from './customers/customers.module';
import { MetadataModule } from './metadata/metadata.module';
import { ContactsModule } from './contacts/contacts.module';
import { RecruitmentModule } from './recruitment/recruitment.module';
import { Recruitment } from './entities/recruitment.entity';
import { Slider } from './entities/slider.entity';
import { SlidersModule } from './slider/slider.module';
import { Banner } from './entities/banner.entity';
import { BannersModule } from './banner/slider/banner.module';
import { ProjectImage } from './entities/project_image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as "mysql" | "mariadb" | "sqlite",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) ?? 3306,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      entities: [
        Category,
        Contact,
        Customer,
        Document,
        Metadata,
        New,
        Partner,
        Project,
        ProjectImage,
        Service,
        Staff,
        User,
        Recruitment,
        Slider,
        Banner
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    NewsModule,
    UsersModule,
    AuthModule,
    ImagesModule,
    DocumentsModule,
    CategoriesModule,
    PartnersModule,
    ProjectsModule,
    ServicesModule,
    StaffsModule,
    CustomersModule,
    MetadataModule,
    ContactsModule,
    RecruitmentModule,
    SlidersModule,
    BannersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
