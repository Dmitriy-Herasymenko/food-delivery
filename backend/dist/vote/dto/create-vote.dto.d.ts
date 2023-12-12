export declare class CreateVoteDto {
    readonly userId: string;
    readonly isOpen: boolean;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly title: string;
    readonly votes: {
        option: string;
        description: string;
    }[];
}
