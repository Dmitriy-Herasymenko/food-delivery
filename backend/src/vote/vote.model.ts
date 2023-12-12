import { Model, Table, Column, DataType, BeforeValidate } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from 'uuid';

interface VoteCreationAtrr {
    userId: string;
    isOpen: boolean;
    startDate: Date;
    endDate: Date;
    title: string;
    votes: { option: string; description: string }[];
}

@Table({tableName: "votes"})
export class Vote extends Model <Vote, VoteCreationAtrr> {
    @ApiProperty({ example: "1", description: "id" })
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string;
    @ApiProperty({example: "1", description: "userId"})
    @Column({type: DataType.STRING, allowNull: false})
    userId: string;
    @ApiProperty({example: true, description: "isOpen"})
    @Column({type: DataType.BOOLEAN, allowNull: false})
    isOpen: boolean;
    @ApiProperty({ example: "2023-12-11T12:00:00Z", description: "startDate" })
    @Column({ type: DataType.DATE, allowNull: false })
    startDate: Date;
    @ApiProperty({ example: "2023-12-25T12:00:00Z", description: "endDate" })
    @Column({ type: DataType.DATE, allowNull: false })
    endDate: Date;
    @ApiProperty({ example: "Votes Pizza Delivery", description: "title" })
    @Column({ type: DataType.STRING, allowNull: false })
    title: string;
    @ApiProperty({
        example: [
            { option: "Option 1", description: "Description for Option 1" },
            { option: "Option 2", description: "Description for Option 2" },
        ],
        description: "votes",
    })
    @Column({ type: DataType.JSONB, allowNull: false })
    votes: { option: string; description: string }[];

    @BeforeValidate
    static addUuid(instance: Vote) {
        if (!instance.id) {
            instance.id = uuidv4();
        }
    }
}