import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersGateway } from "./users.gateway";
export declare class UsersService {
    private userRepository;
    private usersGateway;
    constructor(userRepository: typeof User, usersGateway: UsersGateway);
    createUser(dto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    findOne(userId: string): Promise<User | null>;
    sendMessage(senderId: string, receiverId: string, content: string): Promise<User>;
}
