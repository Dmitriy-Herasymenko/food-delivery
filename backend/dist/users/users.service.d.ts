import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersGateway } from "./users.gateway";
export declare class UsersService {
    private userRepository;
    private usersGateway;
    constructor(userRepository: typeof User, usersGateway: UsersGateway);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
    getUnreadMessageCount(userId: string): Promise<number>;
    getMessageHistory(userId: string): Promise<{
        message: any;
        unreadCount: number;
    }[]>;
    getUserByEmail(email: string): Promise<User | null>;
    findOne(userId: string): Promise<User | null>;
    sendMessage(senderId: string, receiverId: string, content: string): Promise<void>;
    markMessagesAsRead(userId: string): Promise<void>;
    getUnreadMessages(userId: string): Promise<any[]>;
    private findUserById;
}
