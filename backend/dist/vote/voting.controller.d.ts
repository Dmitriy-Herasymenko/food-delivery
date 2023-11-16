import { VoteDto } from './dto/vote.dto';
import { VotingService } from './voting.service';
export declare class VotingController {
    private readonly votingService;
    constructor(votingService: VotingService);
    create(voteDto: VoteDto): Promise<void>;
}
