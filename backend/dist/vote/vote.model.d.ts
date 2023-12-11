import { Model } from "sequelize-typescript";
interface VoteCreationAtrr {
    userId: string;
    isOpen: boolean;
    startDate: Date;
    endDate: Date;
    title: string;
    votes: {
        option: string;
        description: string;
    }[];
}
export declare class Vote extends Model<Vote, VoteCreationAtrr> {
    id: string;
    userId: string;
    isOpen: boolean;
    startDate: Date;
    endDate: Date;
    title: string;
    votes: {
        option: string;
        description: string;
    }[];
    static addUuid(instance: Vote): void;
}
export {};
