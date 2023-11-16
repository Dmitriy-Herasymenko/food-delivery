import { Model } from "sequelize-typescript";
interface UserCreationAtrr {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationAtrr> {
    id: number;
    email: string;
    password: string;
}
export {};
