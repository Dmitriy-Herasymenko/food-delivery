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
exports.CreateVoteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateVoteDto {
}
exports.CreateVoteDto = CreateVoteDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "userId" }),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: "isOpen" }),
    __metadata("design:type", Boolean)
], CreateVoteDto.prototype, "isOpen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2023-12-11T12:00:00Z", description: "startDate" }),
    __metadata("design:type", Date)
], CreateVoteDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2023-12-25T12:00:00Z", description: "endDate" }),
    __metadata("design:type", Date)
], CreateVoteDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Votes Pizza Delivery", description: "title" }),
    __metadata("design:type", String)
], CreateVoteDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [
            { option: "Option 1", description: "Description for Option 1" },
            { option: "Option 2", description: "Description for Option 2" },
        ],
        description: "votes" }),
    __metadata("design:type", Array)
], CreateVoteDto.prototype, "votes", void 0);
//# sourceMappingURL=create-vote.dto.js.map