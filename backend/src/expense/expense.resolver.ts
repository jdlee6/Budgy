import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Expense } from './entity/expense/expense';
import { ExpenseService } from './expense.service';

@Resolver('Expense')
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Query(() => [Expense])
  async expenses() {
    return this.expenseService.findAll();
  }

  @Mutation(() => Expense)
  async createExpense(
    @Args('name') name: string,
    @Args('amount') amount: number,
    @Args('userId') userId: number,
    @Args('recurring') recurring: boolean,
  ) {
    return this.expenseService.create(name, amount, userId, recurring);
  }

  @Mutation(() => Expense)
  async updateExpense(
    @Args('id') expenseId: number,
    @Args('amount') amount: number,
    @Args('name') name: string,
    @Args('recurring') recurring: boolean,
  ) {
    return this.expenseService.updateExpense(
      expenseId,
      amount,
      name,
      recurring,
    );
  }

  // @Mutation(() => Expense)
  // async deleteExpense(@Args('id') expenseId: number) {
  //   return this.expenseService.delete(expenseId);
  // }
}
