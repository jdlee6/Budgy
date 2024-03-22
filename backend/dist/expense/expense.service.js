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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const expense_1 = require("./entity/expense");
const expense_repository_1 = require("./expense.repository");
let ExpenseService = class ExpenseService {
    constructor(expenseRepository) {
        this.expenseRepository = expenseRepository;
    }
    async findAll() {
        const expenses = await this.expenseRepository.find();
        return expenses;
    }
    async create(newExpenseInput) {
        const expense = new expense_1.Expense();
        expense.name = newExpenseInput.name;
        expense.amount = newExpenseInput.amount;
        expense.recurring = newExpenseInput.recurring;
        expense.userId = newExpenseInput.userId;
        const savedExpense = await this.expenseRepository.save(expense);
        return {
            name: savedExpense.name,
            amount: savedExpense.amount,
            recurring: savedExpense.recurring,
            userId: savedExpense.userId,
        };
    }
    async updateExpense(updateExpenseDto) {
        const expense = await this.expenseRepository.findOne({
            where: { id: updateExpenseDto.id },
            relations: ['user'],
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${updateExpenseDto.id} not found`);
        }
        Object.assign(expense, updateExpenseDto);
        const updatedExpense = await this.expenseRepository.save(expense);
        return {
            id: updatedExpense.id,
            name: updatedExpense.name,
            amount: updatedExpense.amount,
            recurring: updatedExpense.recurring,
        };
    }
    async deleteExpense(expenseId) {
        const result = await this.expenseRepository.delete(expenseId);
        return result.affected > 0;
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_repository_1.ExpenseRepository])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map