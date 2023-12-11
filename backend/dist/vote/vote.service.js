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
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const vote_model_1 = require("./vote.model");
const users_service_1 = require("../users/users.service");
const uuid_1 = require("uuid");
let VotesService = exports.VotesService = class VotesService {
    constructor(voteRepository, userService) {
        this.voteRepository = voteRepository;
        this.userService = userService;
    }
    async createVote(dto) {
        try {
            const votesWithId = dto.votes.map((vote) => ({ ...vote, id: (0, uuid_1.v4)() }));
            const vote = await this.voteRepository.create({
                ...dto,
                votes: votesWithId,
            });
            return vote;
        }
        catch (error) {
            console.error("Error creating vote:", error);
            throw error;
        }
    }
    async findOpenVote(userId) {
        return this.voteRepository.findOne({
            where: { userId, isOpen: true },
        });
    }
    async userExists(userId) {
        const user = await this.userService.findOne(userId);
        return !!user;
    }
    async getAllVotes() {
        const voiting = await this.voteRepository.findAll();
        return voiting;
    }
};
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(vote_model_1.Vote)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], VotesService);
//# sourceMappingURL=vote.service.js.map