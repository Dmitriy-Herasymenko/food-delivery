import { Vote } from './voting.model';
import { VoteDto } from './dto/vote.dto';
export declare class VotingService {
    private voteRepository;
    constructor(voteRepository: typeof Vote);
    createVote(dto: VoteDto): Promise<void>;
}
