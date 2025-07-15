import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(dto: CreateContactMessageDto): Promise<import("./contact-message.entity").ContactMessage>;
}
