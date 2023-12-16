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

  async uploadImage(image: Express.Multer.File): Promise<string> {
    return new Promise((res, rej) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        {
          folder: 'cmed_news',
        },
        (err, result) => {
          if (err) return rej(err);
          res(result.url);
        },
      );
      let str = Readable.from(image.buffer);
      str.pipe(theTransformStream);
    });
  }
}
