import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from 'src/entities/partner.entity';
import { Repository } from 'typeorm';
import { CreatePartnerDto } from './dtos/create-partner.dto';
import { User } from 'src/entities/user.entity';
import { UpdatePartnerDto } from './dtos/update-partner.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly repo: Repository<Partner>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<Partner[]> {
    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
    });
  }

  async findOne(id: number): Promise<Partner> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(partner: CreatePartnerDto, createdUser: User): Promise<Partner> {
    const { name, image } = partner;

    const imageUrl = await this.imagesService.uploadBase64Image(
      'partners',
      image,
    );

    const newPartner = this.repo.create({
      name,
      image: imageUrl,
      createdBy: createdUser,
    });
    return await this.repo.save(newPartner);
  }

  async update(
    id: number,
    partner: UpdatePartnerDto | Partial<UpdatePartnerDto>,
    modifiedUser: User,
  ): Promise<Partner> {
    const partnerToUpdate = await this.repo.findOneBy({ id });
    if (!partnerToUpdate) {
      throw new NotFoundException('Partner not found');
    }

    if (partner.image) {
      const imageUrl = await this.imagesService.uploadBase64Image(
        'partners',
        partner.image,
      );
      partner.image = imageUrl;
    }
    Object.assign(partnerToUpdate, partner);
    partnerToUpdate.modifiedBy = modifiedUser;

    return await this.repo.save(partnerToUpdate);
  }

  async delete(id: number): Promise<void> {
    const partnerToDelete = await this.repo.findOneBy({ id });
    if (!partnerToDelete) {
      throw new NotFoundException('Partner not found');
    }

    await this.repo.remove(partnerToDelete);
  }
}
