import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Vote } from "./vote.model";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class VotesService {
  constructor(@InjectModel(Vote) private voteRepository: typeof Vote, private userService: UsersService) {}

  async createVote(dto: CreateVoteDto) {
    try {
      const votesWithId = dto.votes.map((vote) => ({ ...vote, id: uuidv4() }));

      const vote = await this.voteRepository.create({
        ...dto,
        votes: votesWithId,
      });

      return vote;
    } catch (error) {
      console.error("Error creating vote:", error);
      throw error;
    }
  }

  async findOpenVote(userId: string): Promise<Vote | null> {
    return this.voteRepository.findOne({
      where: { userId, isOpen: true },
    });
  }

  async userExists(userId: string): Promise<boolean> {
    const user = await this.userService.findOne(userId); 
    return !!user;
  }

  async getAllVotes() {
    const voiting = await this.voteRepository.findAll();
    return voiting;
  }
}
