import { Body, Controller, Post } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { VotesService } from "./vote.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Vote } from "./vote.model";
@ApiTags("Vote")
@Controller("voting")
export class VotesController {
  constructor(private voteService: VotesService) {}

  @ApiOperation({summary: "Create vote"})
  @ApiResponse({status: 200, type: Vote})

  @Post()
  create(@Body() voteDto: CreateVoteDto) {
    return this.voteService.createVote(voteDto);
  }
}
