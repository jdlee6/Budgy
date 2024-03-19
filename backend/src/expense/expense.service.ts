import { Injectable } from '@nestjs/common';
import { Expense } from './entity/expense/expense';
import { User } from 'src/user/entity/user/user';

@Injectable()
export class ExpenseService {
  private readonly expenses: Expense[] = [];

  async findAll(): Promise<Expense[]> {
    return this.expenses;
  }

  async create(
    name: string,
    amount: number,
    user: User,
    recurring: boolean,
  ): Promise<any> {
    const expense = new Expense();
    expense.name = name;
    expense.amount = amount;
    expense.user = user;
    expense.recurring = recurring;

    // return await this.expenseRespository.save(expense);
  }
}
