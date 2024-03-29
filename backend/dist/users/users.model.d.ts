import { Model } from "sequelize-typescript";
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
export declare class User extends Model<User, UserCreationAtrr> {
    id: string;
    email: string;
    userName: string;
    password: string;
    sentMessages: Message[];
    receivedMessages: Message[];
    unreadMessages: Message[];
    profileImage: string;
}
export {};
