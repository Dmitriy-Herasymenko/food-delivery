import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}
