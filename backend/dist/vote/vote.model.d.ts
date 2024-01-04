import { Model } from "sequelize-typescript";
interface VoteOption {
    id: string;
    option: string;
    description: string;
    voteCount: number;
}
interface VoteCreationAtrr {
    userId: string;
    isOpen: boolean;
    startDate: Date;
    endDate: Date;
    title: string;
    votes: VoteOption[];
    usersIdVoted: string[];
}
export declare class Vote extends Model<Vote, VoteCreationAtrr> {
    id: string;
    userId: string;
    isOpen: boolean;
    startDate: Date;
    endDate: Date;
    title: string;
    votes: VoteOption[];
    usersIdVoted: string[];
    static addUuid(instance: Vote): void;
}
export {};
