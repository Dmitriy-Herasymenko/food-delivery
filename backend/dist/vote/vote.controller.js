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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const vote_service_1 = require("./vote.service");
const swagger_1 = require("@nestjs/swagger");
const vote_model_1 = require("./vote.model");
let VotesController = exports.VotesController = class VotesController {
    constructor(voteService) {
        this.voteService = voteService;
    }
    async create(voteDto) {
        try {
            const userExists = await this.voteService.userExists(voteDto.userId);
            if (!userExists) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const openVote = await this.voteService.findOpenVote(voteDto.userId);
            if (openVote) {
                throw new common_1.HttpException('User already has an open vote', common_1.HttpStatus.FORBIDDEN);
            }
            const createdVote = await this.voteService.createVote(voteDto);
            return createdVote;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getAll() {
        return this.voteService.getAllVotes();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create vote" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: vote_model_1.Vote }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto]),
    __metadata("design:returntype", Promise)
], VotesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get All Votes" }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [vote_model_1.Vote] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "getAll", null);
exports.VotesController = VotesController = __decorate([
    (0, swagger_1.ApiTags)("Vote"),
    (0, common_1.Controller)("voting"),
    __metadata("design:paramtypes", [vote_service_1.VotesService])
], VotesController);
//# sourceMappingURL=vote.controller.js.map