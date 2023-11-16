import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
    @ApiProperty({example: "user@gmail.com", description: "mail adress"})
    readonly email: string;
    @ApiProperty({example: "123456789", description: "password"})
    readonly password: string;
}