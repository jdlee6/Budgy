import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';
import { Budget } from './entity/budget';
import { BudgetRepository } from './budget.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  providers: [BudgetService, BudgetResolver, BudgetRepository],
})
export class BudgetModule {}
