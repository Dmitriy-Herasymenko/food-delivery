import { Body, Controller, Post, HttpException, HttpStatus } from "@nestjs/common";
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
      if (!voteDto.userId) {
        throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
      }
      const createdVote = await this.voteService.createVote(voteDto);
      return createdVote;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
