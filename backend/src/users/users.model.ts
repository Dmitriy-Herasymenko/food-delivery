import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAtrr {
    email: string;
    password: string;
}

@Table({tableName: "users"})
export class User extends Model <User, UserCreationAtrr> {
    @ApiProperty({example: "1", description: "unique identificator"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: "user@gmail.com", description: "mail address"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: "123456789", description: "password"})
    @Column({type: DataType.STRING, unique: true})
    password: string;

}