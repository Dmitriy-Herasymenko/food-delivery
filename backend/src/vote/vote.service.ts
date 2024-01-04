import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Vote } from "./vote.model";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { UsersService } from "../users/users.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Vote) private voteRepository: typeof Vote,
    private userService: UsersService
  ) {}

  async createVote(dto: CreateVoteDto) {
    try {
      const votesWithId = dto.votes.map((vote) => ({
        ...vote,
        id: uuidv4(),
        voteCount: 0,
      }));

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

  async voteForOption(voteId: string, optionIndex: number): Promise<void> {
    const vote = await this.voteRepository.findByPk(voteId);

    if (!vote) {
      throw new NotFoundException("Voting not found");
    }

    if (vote.endDate < new Date()) {
      throw new BadRequestException("The voting has ended");
    }

    const selectedOption = vote.votes[optionIndex];

    if (!selectedOption) {
      throw new BadRequestException("Invalid option index");
    }

    selectedOption.voteCount += 1;

    await vote.save();
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

  async vote(id: string, userId: string, idVote: string) {
    try {
      let vote = await this.voteRepository.findByPk(id);

      if (!vote) {
        return "Vote not found";
      }

      if (vote.usersIdVoted && vote.usersIdVoted.includes(userId)) {
        return "User has already voted";
      }

      const currentVote = vote.votes.find((option) => option.id === idVote);

      if (currentVote) {
        currentVote.voteCount += 1;

        if (!vote.usersIdVoted) {
          vote.usersIdVoted = [];
        }
        vote.usersIdVoted.push(userId);

        await this.voteRepository.update(
          {
            votes: vote.votes,
            usersIdVoted: vote.usersIdVoted,
          },
          { where: { id } }
        );

        return "Vote successful";
      } else {
        return "Option not found";
      }
    } catch (error) {
      return "Internal server error";
    }
  }
}
