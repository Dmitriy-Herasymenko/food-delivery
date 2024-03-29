import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.model";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "User already registered",
        HttpStatus.BAD_REQUEST
      );
    }
const hashPassword = await bcrypt.hash(userDto.password, 5);
  // const user = await this.userService.createUser(userDto, null);
  const user = await this.userService.createUser({
    ...userDto,
    password: hashPassword,
  }, null);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, userName: user.userName };
    return {
      token: this.jwtService.sign(payload),
      userId: user.id,
      email: user.email, 
      userName: user.userName
    };
  }

  private async validateUser(userDto: CreateUserDto) {
      const user = await this.userService.getUserByEmail(userDto.email);
      const passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if(user && passwordEquals) {
        return user;
      }
      throw new UnauthorizedException({message: "Invalid email or password"})
  }
}
