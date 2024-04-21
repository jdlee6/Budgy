import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Expense } from './entity/expense';
import { ExpenseService } from './expense.service';

import {
  UpdateExpenseDto,
  UpdateExpenseOutput,
} from './dto/update-expense.dto';
import {
  CreateExpenseDto,
  CreateExpenseOutput,
} from './dto/create-expense.dto';

@Resolver('Expense')
export class ExpenseResolver {
  constructor(
    private readonly expenseService: ExpenseService, 
  ) {}
  @Query(() => [Expense])
  async expenses() {
    return this.expenseService.findAll();
  }
  @Query(() => [Expense])
  async expensesByUserId(@Args('userId') userId: number): Promise<Expense[]> {
    return this.expenseService.findExpensesByUserId(userId);
  }
  @Mutation(() => CreateExpenseOutput)
  async createExpense(
    @Args('newExpenseInput') newExpenseInput: CreateExpenseDto,
  ) {
    return this.expenseService.create(newExpenseInput);
  }

  @Mutation(() => UpdateExpenseOutput)
  async updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(updateExpenseInput);
  }

  @Mutation(() => Boolean)
  async deleteExpense(@Args('id') expenseId: number) {
    return this.expenseService.deleteExpense(expenseId);
  }
}
