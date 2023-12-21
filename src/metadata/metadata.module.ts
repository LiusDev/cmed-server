import { Module } from '@nestjs/common';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from 'src/entities/metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata])],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
