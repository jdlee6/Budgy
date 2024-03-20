//https://stackoverflow.com/questions/74542474/how-to-create-custom-separate-file-repository-in-nestjs-9-with-typeorm-0-3-x
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entity/expense/expense';

export class ExpenseRepository extends Repository<Expense> {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {
    super(
      expenseRepository.target,
      expenseRepository.manager,
      expenseRepository.queryRunner,
    );
  }

  async updateExpense(
    expenseId: number,
    amount: number,
    name: string,
    recurring: boolean,
  ): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({
      where: { id: expenseId },
      relations: ['user'],
    });
    expense.amount = amount;
    expense.recurring = recurring;
    expense.name = name;

    await this.expenseRepository.save(expense);

    return expense;
  }

  // your other custom methods in your repo...
}
