import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from 'src/entities/metadata.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata]), ImagesModule,],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
