import { Module } from '@nestjs/common';
import { ConstServicesController } from './const-services.controller';
import { ConstServicesService } from './const-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { ConstService } from '../entities/const-service.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConstService, Category]), ImagesModule],
  controllers: [ConstServicesController],
  providers: [ConstServicesService],
})
export class HomeServicesModule {}
