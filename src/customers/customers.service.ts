import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { User } from 'src/entities/user.entity';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private readonly repo: Repository<Customer>,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.repo.find({
      relations: {
        createdBy: true,
        modifiedBy: true,
      },
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
    const { name, image } = customer;
    const imageUrl = await this.imagesService.uploadBase64Image(
      'customers',
      image,
    );
    const newCustomer = this.repo.create({
      name,
      image: imageUrl,
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
    if (customer.image) {
      const imageUrl = await this.imagesService.uploadBase64Image(
        'customers',
        customer.image,
      );
      customer.image = imageUrl;
    }
    Object.assign(customerToUpdate, customer);
    customerToUpdate.modifiedBy = modifiedUser;

    return await this.repo.save(customerToUpdate);
  }

  async remove(id: number): Promise<void> {
    const customerToDelete = await this.repo.findOneBy({ id });
    if (!customerToDelete) {
      throw new NotFoundException('Customer not found');
    }

    await this.repo.remove(customerToDelete);
  }
}
