import { Injectable, NotFoundException } from '@nestjs/common';
import { Expense } from './entity/expense/expense';
import { ExpenseRepository } from './expense.repository';
import {
  CreateExpenseDto,
  CreateExpenseOutput,
} from './dto/create-expense.dto';
import {
  UpdateExpenseDto,
  UpdateExpenseOutput,
} from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  private readonly expenses: Expense[] = [];
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findAll(): Promise<Expense[]> {
    return this.expenses;
  }

  async create(
    newExpenseInput: CreateExpenseDto,
  ): Promise<CreateExpenseOutput> {
    const expense = new Expense();
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

  async updateExpense(
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateExpenseOutput> {
    const expense = await this.expenseRepository.findOne({
      where: { id: updateExpenseDto.id },
      relations: ['user'],
    });

    if (!expense) {
      throw new NotFoundException(
        `Expense with ID ${updateExpenseDto.id} not found`,
      );
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

  async deleteExpense(expenseId: number): Promise<boolean> {
    const result = await this.expenseRepository.delete(expenseId);
    return result.affected > 0;
  }
}
