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
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(userDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: "Get All Users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll(): Promise<User[]> {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: "Get User by ID" })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: "Send Message to User" })
  @ApiResponse({ status: 200, type: User })
  @Post('send-message')
  async sendMessage(@Body() data: { senderId: string; receiverId: string; content: string }): Promise<any> {
    try {
      return this.userService.sendMessage(data.senderId, data.receiverId, data.content);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: "Mark messages as read for a user" })
  @ApiResponse({ status: 200, description: "Messages marked as read successfully" })
  @Post('mark-messages-read')
  async markMessagesAsRead(@Body() data: { userId: string }): Promise<void> {
    try {
      await this.userService.markMessagesAsRead(data.userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
