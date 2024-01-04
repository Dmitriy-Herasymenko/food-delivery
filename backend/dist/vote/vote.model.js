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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const swagger_1 = require("@nestjs/swagger");
const uuid_1 = require("uuid");
let Vote = class Vote extends sequelize_typescript_1.Model {
    static addUuid(instance) {
        if (!instance.id) {
            instance.id = (0, uuid_1.v4)();
        }
    }
};
exports.Vote = Vote;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "id" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, defaultValue: sequelize_typescript_1.DataType.UUIDV4, primaryKey: true }),
    __metadata("design:type", String)
], Vote.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "userId" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Vote.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: "isOpen" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false }),
    __metadata("design:type", Boolean)
], Vote.prototype, "isOpen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2023-12-11T12:00:00Z", description: "startDate" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Vote.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2023-12-25T12:00:00Z", description: "endDate" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: false }),
    __metadata("design:type", Date)
], Vote.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Votes Pizza Delivery", description: "title" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Vote.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { option: "Option 1", description: "Description for Option 1", voteCount: 0 },
            { option: "Option 2", description: "Description for Option 2", voteCount: 0 },
        ],
        description: "votes",
    }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB, allowNull: false, defaultValue: [] }),
    __metadata("design:type", Array)
], Vote.prototype, "votes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ["userId1", "userId2"], description: "usersIdVoted" }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING), allowNull: true }),
    __metadata("design:type", Array)
], Vote.prototype, "usersIdVoted", void 0);
__decorate([
    sequelize_typescript_1.BeforeValidate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Vote]),
    __metadata("design:returntype", void 0)
], Vote, "addUuid", null);
exports.Vote = Vote = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "votes", timestamps: false })
], Vote);
//# sourceMappingURL=vote.model.js.map