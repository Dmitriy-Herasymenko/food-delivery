import { Body, Controller, Post, Get, Param, NotFoundException, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { BodyData } from "./types";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  @UseInterceptors(FileInterceptor('profileImage', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(@Body() userDto: CreateUserDto, @UploadedFile() profileImage): Promise<User> {
    try {
      const profileImageFilename = profileImage ? profileImage.filename : undefined;
      return await this.userService.createUser(userDto, profileImageFilename);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({ status: 200, type: User })
  @Post('update')
  
  async updateUser(
    
    @Body() body: BodyData
  ): Promise<User> {
    
    const { id, userName, profileImageBase64, password } = body;

    // const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    // const filename = `${randomName}.png`;
    // const buffer = Buffer.from(profileImageBase64, 'base64');
    // const destinationPath = path.join('./uploads', filename);
    // try {
    //   fs.writeFileSync(destinationPath, buffer);
    // } catch (error) {
    //   throw new NotFoundException('Failed to save the image');
    // }

    try {

      return await this.userService.updateProfile(id, userName, profileImageBase64, password);
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
  async markMessagesAsRead(@Body() data: { userId: string, messageId:string }): Promise<void> {
    try {
      await this.userService.markMessagesAsRead(data.userId, data.messageId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  
}
