import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Like, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly repo: Repository<Contact>,
  ) {}

  async getContacts({
    name,
    phone,
    email,
    company,
    page = '1',
    perPage = '10',
    sortBy = 'id',
    order = 'ASC',
  }: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    page?: string;
    perPage?: string;
    sortBy?: string;
    order?: string;
  }): Promise<Contact[]> {
    const validPage = parseInt(page) || 1;
    const validPerPage = parseInt(perPage) || 10;

    return await this.repo.find({
      where: {
        name: Like(`%${name || ''}%`),
        phone: Like(`%${phone || ''}%`),
        email: Like(`%${email || ''}%`),
        company: Like(`%${company || ''}%`),
      },
      order: {
        [sortBy]: order.toUpperCase(),
      },
      skip: (validPage - 1) * validPerPage,
      take: validPerPage,
    });
  }

  async getContact(id: number): Promise<Contact> {
    return await this.repo.findOneBy({ id });
  }

  async createContact(contact: CreateContactDto): Promise<Contact> {
    const newContact = this.repo.create(contact);
    return await this.repo.save(newContact);
  }
}
