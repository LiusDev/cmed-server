import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingService as SettingService } from './setting.service';
import { Setting } from '../entities/setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), AuthModule, ImagesModule],
  providers: [SettingService],
  controllers: [SettingController],
})
export class SettingModule { }
