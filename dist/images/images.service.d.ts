import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
export declare class ImagesService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadBase64Image(folder: string, image: string): Promise<string>;
    private getPublicIdFromUrl;
    deleteImage(imageUrl: string): Promise<UploadApiResponse>;
}
