import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user/user").User>;
    findAll(): Promise<import("./entities/user/user").User[]>;
    findOne(id: string): Promise<import("./entities/user/user").User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
