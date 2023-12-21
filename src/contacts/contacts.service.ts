import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact) private readonly repo: Repository<Contact>,
  ) {}

  async getContacts(): Promise<Contact[]> {
    return await this.repo.find();
  }

  async getContact(id: number): Promise<Contact> {
    return await this.repo.findOneBy({ id });
  }

  async createContact(contact: CreateContactDto): Promise<Contact> {
    const newContact = this.repo.create(contact);
    return await this.repo.save(newContact);
  }
}
