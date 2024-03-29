import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BudgetService } from './budget.service';
import { Budget } from './entity/budget';
import { CreateBudgetDto, CreateBudgetOutput } from './dto/create-budget.dto';
import { UpdateBudgetDto, UpdateBudgetOutput } from './dto/update-budget.dto';

@Resolver(() => Budget)
export class BudgetResolver {
  constructor(private readonly budgetService: BudgetService) {}

  @Query(() => [Budget])
  async budgets() {
    return this.budgetService.findAll();
  }

  @Query(() => Budget)
  async budgetsByUserId(@Args('userId') userId: number) {
    return this.budgetService.findById(userId);
  }

  @Mutation(() => CreateBudgetOutput)
  async createBudget(@Args('newBudgetInput') newBudgetInput: CreateBudgetDto) {
    return this.budgetService.create(newBudgetInput);
  }

  @Mutation(() => UpdateBudgetOutput)
  async updateBudget(
    @Args('updateBudgetInput') updateBudgetInput: UpdateBudgetDto,
  ) {
    return this.budgetService.updateBudget(updateBudgetInput);
  }

  // should pass in userId and check if the user is the owner of the budget
  @Mutation(() => Budget)
  async deleteBudget(@Args('id') budgetId: number) {
    return this.budgetService.deleteBudget(budgetId);
  }
}
