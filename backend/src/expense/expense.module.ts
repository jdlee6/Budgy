import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseResolver } from './expense.resolver';
import { ExpenseService } from './expense.service';
import { Expense } from './entity/expense/expense';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
