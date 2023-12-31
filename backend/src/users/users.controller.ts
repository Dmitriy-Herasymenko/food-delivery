import { Body, Controller, Post, Get } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({summary: "Create user"})
  @ApiResponse({status: 200, type: User})

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }


  @ApiOperation({summary: "Get All Users"})
  @ApiResponse({status: 200, type: [User]})

  @Get()
  getAll() {
    return this.userService.getAllUSers();
  }
}
