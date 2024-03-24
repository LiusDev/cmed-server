import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactsController {
    private readonly contactsService;
    constructor(contactsService: ContactsService);
    getContacts(query: {
        name?: string;
        phone?: string;
        email?: string;
        company?: string;
        page?: string;
        perPage?: string;
        sortBy?: string;
        order?: string;
    }): Promise<import("../entities/contact.entity").Contact[]>;
    getContact(id: number): Promise<import("../entities/contact.entity").Contact>;
    createContact(contact: CreateContactDto): Promise<import("../entities/contact.entity").Contact>;
}
