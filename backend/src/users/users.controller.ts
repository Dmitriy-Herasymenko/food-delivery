import { Body, Controller, Post, Get, Param, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: "Get All Users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: "Get User by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.getUserById(id);
      return user;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: "Send Message to User" })
  @ApiResponse({ status: 200, type: User })
  @Post('send-message')
  sendMessage(@Body() data: { senderId: string; receiverId: string; content: string }): Promise<User> {
    try {
      return this.userService.sendMessage(data.senderId, data.receiverId, data.content);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
