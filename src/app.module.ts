import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
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
import { SlidersModule } from './slider/slider.module';
import { BannersModule } from './banner/slider/banner.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SettingModule } from './setting/setting.module';
import { Service2Module } from './service2/service2.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'mariadb' | 'sqlite',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) ?? 3306,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
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
    BannersModule,
    CloudinaryModule,
    SettingModule,
    ServicesModule,
    Service2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
