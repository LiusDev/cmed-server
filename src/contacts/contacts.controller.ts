import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ContactDto } from './dto/contact.dto';
import { ContactsService } from './contacts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
@Serialize(ContactDto)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getContacts() {
    return await this.contactsService.getContacts();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getContact(id: number) {
    return await this.contactsService.getContact(id);
  }

  @Post()
  async createContact(@Body() contact: CreateContactDto) {
    return await this.contactsService.createContact(contact);
  }
}
