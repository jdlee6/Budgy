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
exports.ExpenseResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const expense_1 = require("./entity/expense/expense");
const expense_service_1 = require("./expense.service");
const update_expense_dto_1 = require("./dto/update-expense.dto");
const create_expense_dto_1 = require("./dto/create-expense.dto");
let ExpenseResolver = class ExpenseResolver {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async expenses() {
        return this.expenseService.findAll();
    }
    async createExpense(newExpenseInput) {
        return this.expenseService.create(newExpenseInput);
    }
    async updateExpense(updateExpenseInput) {
        return this.expenseService.updateExpense(updateExpenseInput);
    }
};
exports.ExpenseResolver = ExpenseResolver;
__decorate([
    (0, graphql_1.Query)(() => [expense_1.Expense]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "expenses", null);
__decorate([
    (0, graphql_1.Mutation)(() => create_expense_dto_1.CreateExpenseOutput),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_dto_1.CreateExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "createExpense", null);
__decorate([
    (0, graphql_1.Mutation)(() => update_expense_dto_1.UpdateExpenseOutput),
    __param(0, (0, graphql_1.Args)('updateExpenseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expense_dto_1.UpdateExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseResolver.prototype, "updateExpense", null);
exports.ExpenseResolver = ExpenseResolver = __decorate([
    (0, graphql_1.Resolver)('Expense'),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseResolver);
//# sourceMappingURL=expense.resolver.js.map