import { ApiProperty } from "@nestjs/swagger";
export class CreateVoteDto {
    @ApiProperty({example: "1", description: "user id"})
    readonly id: string;
}