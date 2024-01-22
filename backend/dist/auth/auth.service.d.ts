import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<{
        token: string;
        userId: string;
        email: string;
        userName: string;
    }>;
    registration(userDto: CreateUserDto): Promise<{
        token: string;
        userId: string;
        email: string;
        userName: string;
    }>;
    private generateToken;
    private validateUser;
}
