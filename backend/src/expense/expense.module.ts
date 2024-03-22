import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { Expense } from './entity/expense';
import { ExpenseRepository } from './expense.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpenseService, ExpenseResolver, ExpenseRepository],
})
export class ExpenseModule {}
