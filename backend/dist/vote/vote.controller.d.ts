import { CreateVoteDto } from "./dto/create-vote.dto";
import { VotesService } from "./vote.service";
import { Vote } from "./vote.model";
export declare class VotesController {
    private voteService;
    constructor(voteService: VotesService);
    create(voteDto: CreateVoteDto): Promise<Vote>;
}
