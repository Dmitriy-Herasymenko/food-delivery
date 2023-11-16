import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface VoteCreationAtrr {
    userId: string;
}

@Table({tableName: "votes"})
export class Vote extends Model <Vote, VoteCreationAtrr> {
    @ApiProperty({example: "1", description: "userID"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    userId: string;
}