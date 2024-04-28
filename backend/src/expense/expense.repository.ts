//https://stackoverflow.com/questions/74542474/how-to-create-custom-separate-file-repository-in-nestjs-9-with-typeorm-0-3-x
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entity/expense';

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

  async findExpensesByUserId(userId: number): Promise<any> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .innerJoinAndSelect('expense.category', 'category')
      .where('expense.userId = :userId', { userId })
      .getMany();
  }

  // your other custom methods in your repo...
}
