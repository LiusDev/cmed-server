import { ImagesService } from './images.service';
import { UploadImageDto } from './dtos/upload-image.dto';
import { DeleteImageDto } from './dtos/delete-image.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadImage(folder: string, body: UploadImageDto): Promise<void>;
    deleteImage(body: DeleteImageDto): Promise<void>;
}
