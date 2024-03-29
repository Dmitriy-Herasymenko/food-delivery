import { CreateUserDto } from "./dto/create-user.dto";
import { BodyData } from "./types";
import { UsersService } from "./users.service";
import { User } from "./users.model";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    create(userDto: CreateUserDto, profileImage: any): Promise<User>;
    updateUser(body: BodyData): Promise<User>;
    getAll(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    sendMessage(data: {
        senderId: string;
        receiverId: string;
        content: string;
    }): Promise<any>;
    markMessagesAsRead(data: {
        userId: string;
        messageId: string;
    }): Promise<void>;
}
