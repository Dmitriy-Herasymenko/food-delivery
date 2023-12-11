import { Vote } from './vote.model';
import { CreateVoteDto } from './dto/create-vote.dto';
export declare class VotesService {
    private voteRepository;
    constructor(voteRepository: typeof Vote);
    createVote(dto: CreateVoteDto): Promise<Vote>;
}
