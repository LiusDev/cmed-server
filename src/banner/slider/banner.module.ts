import { Module } from '@nestjs/common';
import { BannersService } from './banner.service';
import { bannersController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { Banner } from '../../entities/banner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Banner]),
    AuthModule,
    ImagesModule,
  ],
  providers: [BannersService],
  controllers: [bannersController],
})
export class BannersModule { }
