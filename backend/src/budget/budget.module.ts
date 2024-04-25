import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';
import { Budget } from './entity/budget';
import { BudgetRepository } from './budget.repository';
import { User } from 'src/user/entity/user';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, User])],
  providers: [BudgetService, BudgetResolver, BudgetRepository, UserRepository],
})
export class BudgetModule {}
