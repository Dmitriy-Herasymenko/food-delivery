import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vote } from "./vote.model";
import { CreateVoteDto } from "./dto/create-vote.dto";

@Injectable()
export class VotesService {
    constructor(@InjectModel(Vote) private voteRepository: typeof Vote) {}

    async createVote(dto: CreateVoteDto){
       const vote = await this.voteRepository.create(dto)    
       return vote; 
    }
}
