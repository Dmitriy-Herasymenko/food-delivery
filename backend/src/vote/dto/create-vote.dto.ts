import { ApiProperty } from "@nestjs/swagger";
export class CreateVoteDto {
    @ApiProperty({example: "1", description: "userId"})
    readonly userId: string;
}