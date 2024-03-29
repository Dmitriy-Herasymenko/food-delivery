import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { v4 as uuidv4 } from "uuid";

interface Message {
  message: string;
  userName: string;
  messageId: string;
}
interface UserCreationAtrr {
  email: string;
  password: string;
  userName: string;
  sentMessages: string[];
  receivedMessages: string[];
  unreadMessages: Message[]; 
  profileImage: string;
}

@Table({ tableName: "users", timestamps: false })
export class User extends Model<User, UserCreationAtrr> {
  @ApiProperty({ example: "1", description: "unique identificator" })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  
  @ApiProperty({ example: "user@gmail.com", description: "mail address" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "user", description: "user" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  userName: string;

  @ApiProperty({ example: "123456789", description: "password" })
  @Column({ type: DataType.STRING, unique: false })
  password: string;

  @ApiProperty({
    example: [
      { message: "Hello!", userName: "User" },
      { message: "Hello!", userName: "User" },
    ],
    description: "sentMessages",
  })
  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  sentMessages: Message[];

  @ApiProperty({
    example: [
      { message: "Hello!", userName: "User" },
      { message: "Hello!", userName: "User" },
    ],
    description: "receivedMessages",
  })
  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  receivedMessages: Message[];

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  unreadMessages: Message[];

  @Column({ type: DataType.TEXT, allowNull: true }) 
  profileImage: string;
}
