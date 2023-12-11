import { Body, Controller, Post, Get, HttpException, HttpStatus } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { VotesService } from "./vote.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Vote } from "./vote.model";

@ApiTags("Vote")
@Controller("voting")
export class VotesController {
  constructor(private voteService: VotesService) {}

  @ApiOperation({ summary: "Create vote" })
  @ApiResponse({ status: 200, type: Vote })

  @Post()
  async create(@Body() voteDto: CreateVoteDto) {
    try {
      const userExists = await this.voteService.userExists(voteDto.userId);

      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const openVote = await this.voteService.findOpenVote(voteDto.userId);

      if (openVote) {
        throw new HttpException('User already has an open vote', HttpStatus.FORBIDDEN);
      }
      const createdVote = await this.voteService.createVote(voteDto);
      return createdVote;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @ApiOperation({summary: "Get All Votes"})
  @ApiResponse({status: 200, type: [Vote]})
  @Get()
  getAll() {
    return this.voteService.getAllVotes();
  }
}
