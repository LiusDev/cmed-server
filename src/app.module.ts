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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        Category,
        Contact,
        Customer,
        Document,
        Metadata,
        New,
        Partner,
        Project,
        Service,
        Staff,
        User,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
