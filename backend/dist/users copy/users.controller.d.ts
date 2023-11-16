import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./users.model";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto): Promise<User>;
    getAll(): Promise<User[]>;
}
