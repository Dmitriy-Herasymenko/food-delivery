import { ApiProperty } from "@nestjs/swagger";
export class CreateVoteDto {
    @ApiProperty({example: "1", description: "userId"})
    readonly userId: string;
    @ApiProperty({example: true, description: "isOpen"})
    readonly isOpen: boolean;
    @ApiProperty({example: "2023-12-11T12:00:00Z", description: "startDate"})
    readonly startDate: Date;
    @ApiProperty({example: "2023-12-25T12:00:00Z", description: "endDate"})
    readonly endDate: Date;
    @ApiProperty({example: "Votes Pizza Delivery", description: "title"})
    readonly title: string;
    @ApiProperty({example: [
        { option: "Option 1", description: "Description for Option 1" },
        { option: "Option 2", description: "Description for Option 2" },
    ],
    description: "votes"})
    readonly votes: { option: string; description: string }[];
}