import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactsService {
    private readonly repo;
    constructor(repo: Repository<Contact>);
    getContacts({ name, phone, email, company, page, perPage, sortBy, order, }: {
        name?: string;
        phone?: string;
        email?: string;
        company?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<Contact[]>;
    getContact(id: number): Promise<Contact>;
    createContact(contact: CreateContactDto): Promise<Contact>;
}
