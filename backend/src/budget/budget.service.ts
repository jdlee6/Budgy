import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto, CreateBudgetOutput } from './dto/create-budget.dto';
import { Budget } from './entity/budget';
import { BudgetRepository } from './budget.repository';

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  async findAll(): Promise<Budget[]> {
    const budgets = await this.budgetRepository.find();
    return budgets;
  }

  async findById(id: number): Promise<Budget> {
    try {
      const budget = await this.budgetRepository.findOne({
        where: { id: id },
      });
      return budget;
    } catch (err) {
      throw new NotFoundException(`Budget with id ${id} not found`);
    }
  }

  async findBudgetsByUserId(userId: number) {
    const budget = await this.budgetRepository.findBudgetsByUserId(userId);
    return budget;
  }

  async create(newBudgetInput: CreateBudgetDto): Promise<CreateBudgetOutput> {
    const budget = new Budget();
    budget.amount = newBudgetInput.amount;
    budget.userId = newBudgetInput.userId;
    budget.categoryId = newBudgetInput.categoryId;

    const savedBudget = await this.budgetRepository.save(budget);

    return {
      id: savedBudget.id,
      amount: savedBudget.amount,
      userId: savedBudget.userId,
      categoryId: savedBudget.categoryId,
    };
  }

  // Todo: update/delete
}
