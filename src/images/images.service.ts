import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as sharp from 'sharp';
import { Readable } from 'stream';
import { toWebp } from '../utils';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadBase64Image(folder: string, image: string): Promise<UploadApiResponse> {
    try {
      const imageBuffer = await toWebp(image);
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        Readable.from(imageBuffer).pipe(uploadStream);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async uploadBufferImage(folder: string, image: Buffer): Promise<UploadApiResponse> {
    try {
      const imageBuffer = await sharp(image).webp().toBuffer();
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
        Readable.from(imageBuffer).pipe(uploadStream);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private getPublicIdFromUrl(imageUrl: string): string {
    const splitUrl = imageUrl.split('/');
    const folderName = splitUrl[splitUrl.length - 2];
    const publicIdWithExtension = splitUrl[splitUrl.length - 1];
    return `${folderName}/${publicIdWithExtension.split('.')[0]}`;
  }

  async deleteImage(...imageUrl: string[]): Promise<void> {
    try {
      const publicIds = imageUrl.map(this.getPublicIdFromUrl);
      await cloudinary.api.delete_resources(publicIds, {
        type: 'upload',
        resource_type: 'image',
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}