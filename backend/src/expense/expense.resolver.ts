import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Expense } from './entity/expense/expense';
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
  constructor(private readonly expenseService: ExpenseService) {}

  @Query(() => [Expense])
  async expenses() {
    return this.expenseService.findAll();
  }

  @Mutation(() => CreateExpenseOutput)
  async createExpense(newExpenseInput: CreateExpenseDto) {
    return this.expenseService.create(newExpenseInput);
  }

  @Mutation(() => UpdateExpenseOutput)
  async updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseDto,
  ) {
    return this.expenseService.updateExpense(updateExpenseInput);
  }

  // @Mutation(() => Expense)
  // async deleteExpense(@Args('id') expenseId: number) {
  //   return this.expenseService.deleteExpense(expenseId);
  // }
}
