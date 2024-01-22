import { Model } from "sequelize-typescript";
interface UserCreationAtrr {
    email: string;
    password: string;
    userName: string;
}
export declare class User extends Model<User, UserCreationAtrr> {
    id: string;
    email: string;
    userName: string;
    password: string;
}
export {};
