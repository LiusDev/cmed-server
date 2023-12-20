import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadBase64Image(folder: string, image: string): Promise<string> {
    const base64Data = image.split(',')[1];
    const imageBuffer = Buffer.from(base64Data, 'base64');

    return new Promise((res, rej) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (err, result) => {
          if (err) return rej(err);
          res(result.url);
        },
      );
      let str = Readable.from(imageBuffer);
      str.pipe(theTransformStream);
    });
  }

  private getPublicIdFromUrl(imageUrl: string): string {
    const splitUrl = imageUrl.split('/');
    const folderName = splitUrl[splitUrl.length - 2];
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    const publicId = folderName + '/' + publicIdWithExtension.split('.')[0];

    return publicId;
  }

  async deleteImage(imageUrl: string): Promise<UploadApiResponse> {
    const publicId = this.getPublicIdFromUrl(imageUrl);
    return await cloudinary.api.delete_resources([publicId], {
      type: 'upload',
      resource_type: 'image',
    });
  }
}
