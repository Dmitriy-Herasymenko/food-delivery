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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
const users_gateway_1 = require("./users.gateway");
let UsersService = class UsersService {
    constructor(userRepository, usersGateway) {
        this.userRepository = userRepository;
        this.usersGateway = usersGateway;
    }
    async createUser(dto) {
        const user = await this.userRepository.create(dto);
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
    async getUserById(id) {
        const user = await this.userRepository.findByPk(id);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findOne({
            where: { email: email },
            include: { all: true },
        });
        return user;
    }
    async findOne(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        return user;
    }
    async sendMessage(senderId, receiverId, content) {
        const sender = await this.findUserById(senderId);
        const receiver = await this.findUserById(receiverId);
        const message = {
            text: content,
            username: sender.userName,
        };
        sender.sentMessages = sender.sentMessages || [];
        sender.sentMessages.push(message);
        receiver.receivedMessages = receiver.receivedMessages || [];
        receiver.receivedMessages.push(message);
        await this.userRepository.update({ sentMessages: sender.sentMessages }, { where: { id: senderId } });
        await this.userRepository.update({ receivedMessages: receiver.receivedMessages }, { where: { id: receiverId } });
        this.usersGateway.server.to(receiverId).emit("newMessage", {
            message,
            unreadCount: receiver.unreadMessages.length,
        });
        return sender;
    }
    async findUserById(userId) {
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, users_gateway_1.UsersGateway])
], UsersService);
//# sourceMappingURL=users.service.js.map