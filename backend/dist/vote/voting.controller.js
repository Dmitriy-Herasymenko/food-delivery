"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vote_dto_1 = require("./dto/vote.dto");
const voting_service_1 = require("./voting.service");
const voting_model_1 = require("./voting.model");
let VotingController = exports.VotingController = class VotingController {
    constructor(votingService) {
        this.votingService = votingService;
    }
    create(voteDto) {
        return this.votingService.createVote(voteDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create vote" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: voting_model_1.Vote }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [vote_dto_1.VoteDto]),
    __metadata("design:returntype", void 0)
], VotingController.prototype, "create", null);
exports.VotingController = VotingController = __decorate([
    (0, swagger_1.ApiTags)('Voting'),
    (0, common_1.Controller)('voting'),
    __metadata("design:paramtypes", [voting_service_1.VotingService])
], VotingController);
//# sourceMappingURL=voting.controller.js.map