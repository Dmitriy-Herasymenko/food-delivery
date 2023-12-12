import { Vote } from "./vote.model";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UsersService } from "../users/users.service";
export declare class VotesService {
    private voteRepository;
    private userService;
    constructor(voteRepository: typeof Vote, userService: UsersService);
    createVote(dto: CreateVoteDto): Promise<Vote>;
    findOpenVote(userId: string): Promise<Vote | null>;
    userExists(userId: string): Promise<boolean>;
    getAllVotes(): Promise<Vote[]>;
}
