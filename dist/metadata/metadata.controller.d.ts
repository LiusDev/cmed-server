import { MetadataService } from './metadata.service';
import { UpsertMetadataDto } from './dtos/upsert-metadata.dto';
export declare class MetadataController {
    private readonly metadataService;
    constructor(metadataService: MetadataService);
    getMetadataInfo(): Promise<import("../entities/metadata.entity").Metadata>;
    upsertMetadata(body: Partial<UpsertMetadataDto>): Promise<import("../entities/metadata.entity").Metadata>;
}
