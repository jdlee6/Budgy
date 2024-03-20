import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { Expense } from './entity/expense/expense';
import { ExpenseRepository } from './expense.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, ExpenseRepository])],
  providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
