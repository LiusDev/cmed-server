import { Metadata } from 'src/entities/metadata.entity';
import { Repository } from 'typeorm';
import { UpsertMetadataDto } from './dtos/upsert-metadata.dto';
export declare class MetadataService {
    private readonly repo;
    constructor(repo: Repository<Metadata>);
    getMetadata(): Promise<Metadata>;
    upsert(metadata: Partial<UpsertMetadataDto>): Promise<Metadata>;
}
