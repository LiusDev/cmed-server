import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Metadata } from 'src/entities/metadata.entity';
import { Repository } from 'typeorm';
import { UpsertMetadataDto } from './dtos/upsert-metadata.dto';
import { ImagesService } from '../images/images.service';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata) private readonly repo: Repository<Metadata>,
    private readonly imagesService: ImagesService,
  ) { }

  async getMetadata(): Promise<Metadata> {
    return (await this.repo.find())[0];
  }

  async upsert(metadata: Partial<UpsertMetadataDto>): Promise<Metadata> {
    const haveMetadata = (await this.repo.find()).length > 0;
    if (!haveMetadata) {
      const newMetadata = this.repo.create(metadata);
      const tasks: Promise<void>[] = [];
      if (metadata.ceoImage)
        tasks.push(this.imagesService.uploadBase64Image("images", metadata.ceoImage).then(r => { metadata.ceoImage = r.secure_url }))

      if (metadata.quoteImage)
        tasks.push(this.imagesService.uploadBase64Image("images", metadata.quoteImage).then(r => { metadata.quoteImage = r.secure_url }))
      await Promise.all(tasks)
      return await this.repo.save(newMetadata);
    }



    const metadataToUpdate = (await this.repo.find())[0];
    Object.assign(metadataToUpdate, metadata);
    const tasks: Promise<void>[] = [];
    if (metadata.ceoImage && metadata.ceoImage.startsWith("data:image"))
      tasks.push(this.imagesService.deleteImage(metadataToUpdate.ceoImage), this.imagesService.uploadBase64Image("images", metadata.ceoImage).then(r => { metadataToUpdate.ceoImage = r.secure_url }))

    if (metadata.quoteImage && metadata.quoteImage.startsWith("data:image"))
      tasks.push(this.imagesService.deleteImage(metadataToUpdate.quoteImage), this.imagesService.uploadBase64Image("images", metadata.quoteImage).then(r => { metadata.quoteImage = r.secure_url }))
    await Promise.all(tasks)
    return await this.repo.save(metadataToUpdate);
  }
}
