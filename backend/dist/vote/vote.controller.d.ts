import { CreateVoteDto } from "./dto/create-vote.dto";
import { VotesService } from "./vote.service";
import { Vote } from "./vote.model";
export declare class VotesController {
    private voteService;
    constructor(voteService: VotesService);
    vote(id: string, userId: string, idVote: string): Promise<"Vote not found" | "User has already voted" | "Vote successful" | "Option not found" | "Internal server error">;
    create(voteDto: CreateVoteDto): Promise<Vote>;
    getAll(): Promise<Vote[]>;
}
