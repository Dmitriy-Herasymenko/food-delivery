import { Model, Table, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from 'uuid';

interface UserCreationAtrr {
    email: string;
    password: string;
    userName: string;
}

@Table({tableName: "users", timestamps: false})
export class User extends Model <User, UserCreationAtrr> {
    @ApiProperty({example: "1", description: "unique identificator"})
    @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
    id: string;
    @ApiProperty({example: "user@gmail.com", description: "mail address"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: "user", description: "user name"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    userName: string;
    @ApiProperty({example: "123456789", description: "password"})
    @Column({type: DataType.STRING, unique: true})
    password: string;

}