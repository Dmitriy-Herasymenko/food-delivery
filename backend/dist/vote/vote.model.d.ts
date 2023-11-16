import { Model } from "sequelize-typescript";
interface VoteCreationAtrr {
    userId: string;
}
export declare class Vote extends Model<Vote, VoteCreationAtrr> {
    userId: string;
}
export {};
