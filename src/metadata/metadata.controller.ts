import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { UpsertMetadataDto } from './dtos/upsert-metadata.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { MetadataDto } from './dtos/metadata.dto';

@Controller('metadata')
@Serialize(MetadataDto)
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Get()
  async getMetadataInfo() {
    return await this.metadataService.getMetadata();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async upsertMetadata(@Body() body: Partial<UpsertMetadataDto>) {
    return await this.metadataService.upsert(body);
  }
}
