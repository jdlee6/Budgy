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
exports.UpdateUserOutput = exports.UpdateUserDto = void 0;
const graphql_1 = require("@nestjs/graphql");
let UpdateUserDto = class UpdateUserDto {
};
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
exports.UpdateUserDto = UpdateUserDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserDto);
let UpdateUserOutput = class UpdateUserOutput {
};
exports.UpdateUserOutput = UpdateUserOutput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], UpdateUserOutput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserOutput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserOutput.prototype, "email", void 0);
exports.UpdateUserOutput = UpdateUserOutput = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateUserOutput);
//# sourceMappingURL=update-user.dto.js.map