import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vote } from './vote.model';
import { CreateVoteDto } from './dto/create-vote.dto';

@Injectable()
export class VotesService {
  constructor(@InjectModel(Vote) private voteRepository: typeof Vote) {}

  async createVote(dto: CreateVoteDto) {
    const existingVote = await this.voteRepository.findOne({
      where: { userId: dto.userId },
    });

    if (existingVote) {
      throw new HttpException('Vote with this userId already exists', HttpStatus.FORBIDDEN);
    }
    const vote = await this.voteRepository.create(dto);

    return vote;
  }
}
