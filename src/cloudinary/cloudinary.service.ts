import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { UploadApiOptions } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';
import { extractPublicId } from 'cloudinary-build-url'

@Injectable()
export class CloudinaryService {
	constructor() {
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
	}

	async uploadFile(file: Express.Multer.File, options?: UploadApiOptions): Promise<UploadApiResponse> {
		return new Promise((resolve, reject) => {

			const stream = cloudinary.uploader.upload_stream({ ...options, resource_type: "raw", folder: "documents", public_id: Date.now() + "_" + file.originalname }, (error, result) => {
				if (error) return reject(error);
				return resolve(result);
			});
			const upload = new Readable()
			upload.push(file.buffer)
			upload.push(null)
			upload.pipe(stream);
		});
	}

	async deleteFile(url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			const publicId = `${extractPublicId(url)}.pdf`
			cloudinary.api.delete_resources([publicId], { resource_type: "raw", type: "upload" }, (error, result) => {
				if (error) return reject(error);
				return resolve(result);
			});
		});
	}
}
