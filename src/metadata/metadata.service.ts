import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from 'src/entities/metadata.entity';
import { Repository } from 'typeorm';
import { UpsertMetadataDto } from './dtos/upsert-metadata.dto';
import { toWebpString } from '../utils';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private readonly repo: Repository<Metadata>,
  ) { }

  async getMetadata(): Promise<Metadata> {
    return (await this.repo.find())[0];
  }

  async upsert(metadata: Partial<UpsertMetadataDto>): Promise<Metadata> {
    const haveMetadata = (await this.repo.find()).length > 0;
    if (!haveMetadata) {
      const newMetadata = this.repo.create(metadata);
      if (metadata.ceoImage)
        newMetadata.ceoImage = await toWebpString(metadata.ceoImage)
      if (metadata.quoteImage)
        newMetadata.quoteImage = await toWebpString(metadata.quoteImage)
      return await this.repo.save(newMetadata);
    }
    const metadataToUpdate = (await this.repo.find())[0];
    Object.assign(metadataToUpdate, metadata);
    if (metadata.ceoImage)
      metadataToUpdate.ceoImage = await toWebpString(metadata.ceoImage)
    if (metadata.quoteImage)
      metadataToUpdate.quoteImage = await toWebpString(metadata.quoteImage)
    return await this.repo.save(metadataToUpdate);
  }
}
