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
exports.CreateExpenseOutput = exports.CreateExpenseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateExpenseDto = class CreateExpenseDto {
};
exports.CreateExpenseDto = CreateExpenseDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateExpenseDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateExpenseDto.prototype, "recurrence", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateExpenseDto.prototype, "billingDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateExpenseDto.prototype, "userId", void 0);
exports.CreateExpenseDto = CreateExpenseDto = __decorate([
    (0, graphql_1.InputType)()
], CreateExpenseDto);
let CreateExpenseOutput = class CreateExpenseOutput {
};
exports.CreateExpenseOutput = CreateExpenseOutput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateExpenseOutput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateExpenseOutput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateExpenseOutput.prototype, "amount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], CreateExpenseOutput.prototype, "recurrence", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateExpenseOutput.prototype, "billingDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateExpenseOutput.prototype, "userId", void 0);
exports.CreateExpenseOutput = CreateExpenseOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateExpenseOutput);
//# sourceMappingURL=create-expense.dto.js.map