import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from 'src/entities/document.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), AuthModule, CategoriesModule, CloudinaryModule, ImagesModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule { }
