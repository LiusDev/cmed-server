import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entities/customer.entity';
import { Like, Repository } from 'typeorm';
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
    const { name, image, description } = customer;

    const newCustomer = this.repo.create({
      name,
      image,
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
