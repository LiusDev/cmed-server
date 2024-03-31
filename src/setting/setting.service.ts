import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from '../entities/Setting.entity';
import { Like, Repository } from 'typeorm';
import { CreateSettingDto } from './dtos/create-setting.dto';
import { User } from '../entities/user.entity';
import UpdateSettingDto from './dtos/update-setting.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class SettingService {
	constructor(
		@InjectRepository(Setting)
		private readonly repo: Repository<Setting>,
		private readonly imagesService: ImagesService,
	) { }

	async findAll({
		itemId,
		language,
		page = '1',
		perPage = '10',
		sortBy = 'id',
		order = 'DESC',
	}: {
		itemId?: string;
		language?: string;
		page?: string;
		perPage?: string;
		sortBy?: string;
		order?: string;
	}): Promise<Setting[]> {
		const validPage = parseInt(page) || 1;
		const validPerPage = parseInt(perPage) || 10;

		return await this.repo.find({
			where: {
				itemId: Like(`%${itemId || ''}%`),
				language: Like(`%${language || ''}%`),
			},
			order: {
				[sortBy]: order.toUpperCase(),
			},
			skip: (validPage - 1) * validPerPage,
			take: validPerPage,
		});
	}

	async findOne(id: number): Promise<Setting> {
		return await this.repo.findOne({
			where: { id },
		});
	}

	async findByItemId(itemId: string, language: string): Promise<Setting> {
		return await this.repo.findOne({
			where: { itemId, language },
		});

	}

	async create(newItem: CreateSettingDto, createdUser: User): Promise<Setting> {
		const { ...rest } = newItem;
		const item = this.repo.create({
			...rest,
			createdBy: createdUser
		});
		return await this.repo.save(item);
	}

	async updateAbout(updateItem: About | Partial<About>, lang: string, modifiedUser: User): Promise<Setting> {
		const item = await this.repo.findOneBy({ itemId: 'about', language: lang });
		if (!item) {
			throw new NotFoundException('Service not found');
		}

		const { featuredImage, quotes1, quotes2, image2, ...rest } = updateItem;
		Object.assign(item.content, rest);

		const old = item.content as About

		await Promise.all([
			this.updateFeturedImage(featuredImage, old),
			this.updateQuotes1(quotes1, old),
			this.updateQuotes2(quotes2, old),
			this.updateImage2(image2, old)
		])

		item.modifiedBy = modifiedUser;
		return await this.repo.save(item);
	}

	private async updateImage2(image2: string, old: About) {
		if (image2 && (old.image2 == null || old.image2.localeCompare(image2) !== 0)) {
			const tasks: Promise<any>[] = [];
			if (old.image2?.startsWith('https://res.cloudinary.com') || false) {
				tasks.push(this.imagesService.deleteImage(old.image2));
			}
			tasks.push(this.imagesService.uploadBase64Image("images", image2).then(r => {
				old.image2 = r.secure_url;
			}));
			await Promise.all(tasks);
		}
	}

	private async updateFeturedImage(featuredImage: string, old: About) {
		if (featuredImage && old.featuredImage.localeCompare(featuredImage) !== 0) {
			const tasks: Promise<any>[] = [];
			if (old.featuredImage.startsWith('https://res.cloudinary.com')) {
				tasks.push(this.imagesService.deleteImage(old.featuredImage));
			}
			tasks.push(this.imagesService.uploadBase64Image("images", featuredImage).then(r => {
				old.featuredImage = r.secure_url;
			}));
			await Promise.all(tasks);
		}
	}

	private async updateQuotes1(quotes1: About["quotes1"], old: About) {
		const { background, ...rest } = quotes1;
		if (background && old.quotes1.background.localeCompare(background) !== 0) {
			const tasks: Promise<any>[] = [];
			if (old.quotes1.background.startsWith('https://res.cloudinary.com')) {
				tasks.push(this.imagesService.deleteImage(old.quotes1.background));
			}
			tasks.push(this.imagesService.uploadBase64Image("images", quotes1.background).then(r => {
				old.quotes1.background = r.secure_url;
			}));
			await Promise.all(tasks);
			Object.assign(old.quotes1, rest);
		}
		Object.assign(old.quotes1, rest);
	}

	private async updateQuotes2(quotes2: About["quotes2"], old: About) {
		const tasks: Promise<any>[] = [];
		for (let i = 0; i < quotes2.length; i++) {
			const { image, ...rest } = quotes2[i];
			if (image && old.quotes2[i].image.localeCompare(image) !== 0) {
				if (old.featuredImage.startsWith('https://res.cloudinary.com')) {
					tasks.push(this.imagesService.deleteImage(old.quotes2[i].image));
				}
				tasks.push(this.imagesService.uploadBase64Image("images", image).then(r => {
					old.quotes2[i].image = r.secure_url;
				}));
			}
			Object.assign(old.quotes2[i], rest);
		}
		await Promise.all(tasks);
	}

	async update(
		id: number,
		updateItem: UpdateSettingDto | Partial<UpdateSettingDto>,
		modifiedUser: User,
	): Promise<Setting> {
		const item = await this.repo.findOneBy({ id });
		if (!item) {
			throw new NotFoundException('Service not found');
		}
		const { ...rest } = updateItem;
		Object.assign(item, rest);
		item.modifiedBy = modifiedUser;
		return await this.repo.save(item);
	}

	async remove(id: number): Promise<void> {
		const item = await this.repo.findOneBy({ id });
		if (!item) {
			throw new NotFoundException('Service not found');
		}
		await this.repo.remove(item);
	}
}
