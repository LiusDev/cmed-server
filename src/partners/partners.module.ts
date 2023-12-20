import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner]), ImagesModule],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
