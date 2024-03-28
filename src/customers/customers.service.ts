import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Like, Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { User } from 'src/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ImagesService } from 'src/images/images.service';
import { toWebpString } from '../utils';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private readonly repo: Repository<Customer>,
    private readonly imagesService: ImagesService,
  ) { }

  async findAll({
    name,
    description,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'DESC',
  }: {
    name?: string;
    description?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Customer[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: {
        name: Like(`%${name || ''}%`),
        description: Like(`%${description || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async findOne(id: number): Promise<Customer> {
    return await this.repo.findOne({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
      where: { id },
    });
  }

  async create(
    customer: CreateCustomerDto,
    createdUser: User,
  ): Promise<Customer> {
    const { name, image, description, logo, icon } = customer;
    const images = await Promise.all([this.imagesService.uploadBase64Image("images", image), this.imagesService.uploadBase64Image("images", logo), this.imagesService.uploadBase64Image("images", icon)])
    const newCustomer = this.repo.create({
      name,
      image: images[0].secure_url,
      logo: images[1].secure_url,
      icon: images[2].secure_url,
      description,
      createdBy: createdUser,
    });
    return await this.repo.save(newCustomer);
  }

  async update(
    id: number,
    customer: UpdateCustomerDto | Partial<UpdateCustomerDto>,
    modifiedUser: User,
  ): Promise<Customer> {
    const customerToUpdate = await this.repo.findOneBy({ id });
    if (!customerToUpdate) {
      throw new NotFoundException('Customer not found');
    }
    const { image, logo, icon, ...rest } = customer
    Object.assign(customerToUpdate, rest);
    if (image && image.localeCompare(customerToUpdate.image) !== 0) {
      this.imagesService.deleteImage(customerToUpdate.image)
      customerToUpdate.image = (await this.imagesService.uploadBase64Image("images", customer.image)).secure_url
    }

    if (logo && logo.localeCompare(customerToUpdate.logo) !== 0) {
      this.imagesService.deleteImage(customerToUpdate.logo)
      customerToUpdate.logo = (await this.imagesService.uploadBase64Image("images", logo)).secure_url
    }

    if (icon && icon.localeCompare(customerToUpdate.icon) !== 0) {
      this.imagesService.deleteImage(customerToUpdate.icon)
      customerToUpdate.icon = (await this.imagesService.uploadBase64Image("images", icon)).secure_url
    }

    customerToUpdate.modifiedBy = modifiedUser;

    return await this.repo.save(customerToUpdate);
  }

  async remove(id: number): Promise<void> {
    const customerToDelete = await this.repo.findOneBy({ id });
    if (!customerToDelete) {
      throw new NotFoundException('Customer not found');
    }
    await Promise.all([this.imagesService.deleteImage(customerToDelete.image), this.imagesService.deleteImage(customerToDelete.logo), this.imagesService.deleteImage(customerToDelete.icon)])
    await this.repo.remove(customerToDelete);
  }
}
