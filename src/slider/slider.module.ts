import { Module } from '@nestjs/common';
import { SlidersService } from './slider.service';
import { slidersController } from './slider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ImagesModule } from 'src/images/images.module';
import { Slider } from '../entities/slider.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slider]),
    AuthModule,
    ImagesModule,
  ],
  providers: [SlidersService],
  controllers: [slidersController],
})
export class SlidersModule { }
