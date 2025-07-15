import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
export declare class ContactService {
    private readonly contactRepo;
    constructor(contactRepo: Repository<ContactMessage>);
    create(dto: CreateContactMessageDto): Promise<ContactMessage>;
}
