import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({example: "user@gmail.com", description: "mail adress"})
    readonly email: string;
    @ApiProperty({example: "user", description: "user name"})
    readonly userName: string;
    @ApiProperty({example: "123456789", description: "password"})
    readonly password: string;
}