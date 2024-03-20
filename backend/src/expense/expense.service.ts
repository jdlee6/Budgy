import { Injectable } from '@nestjs/common';
import { Expense } from './entity/expense/expense';
import { ExpenseRepository } from './expense.repository';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  private readonly expenses: Expense[] = [];
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async findAll(): Promise<Expense[]> {
    return this.expenses;
  }

  async create(
    name: string,
    amount: number,
    userId: number,
    recurring: boolean,
  ): Promise<CreateExpenseDto> {
    const expense = new Expense();
    expense.name = name;
    expense.amount = amount;
    expense.recurring = recurring;
    expense.userId = userId;

    const savedExpense = await this.expenseRepository.save(expense);

    return {
      id: savedExpense.id,
      name: savedExpense.name,
      amount: savedExpense.amount,
      recurring: savedExpense.recurring,
      userId: savedExpense.userId,
    };
  }

  async updateExpense(
    expenseId: number,
    amount: number,
    name: string,
    recurring: boolean,
  ): Promise<UpdateExpenseDto> {
    const updatedExpense = await this.expenseRepository.updateExpense(
      expenseId,
      amount,
      name,
      recurring,
    );

    return {
      id: updatedExpense.id,
      amount: updatedExpense.amount,
      name: updatedExpense.name,
      recurring: updatedExpense.recurring,
    };
  }
}
