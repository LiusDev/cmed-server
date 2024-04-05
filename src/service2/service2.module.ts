import { Module } from '@nestjs/common';
import { Service2Controller } from './service2.controller';
import { Service2Service } from './service2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/images/images.module';
import { Service2 } from '../entities/service2.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service2, Category]), ImagesModule],
  controllers: [Service2Controller],
  providers: [Service2Service],
})
export class Service2Module {}
