import { Module } from '@nestjs/common';
import { HomeServicesController } from './home-services.controller';
import { HomeServicesService } from './home-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { HomeService } from '../entities/home-service.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeService, Category]), ImagesModule],
  controllers: [HomeServicesController],
  providers: [HomeServicesService],
})
export class HomeServicesModule {}
