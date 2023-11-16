import { Model } from 'sequelize-typescript';
interface VoteCreate {
    userId: string;
}
export declare class Vote extends Model<Vote, VoteCreate> {
    userId: string;
}
export {};
