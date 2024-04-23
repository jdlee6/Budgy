import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto, CreateBudgetOutput } from './dto/create-budget.dto';
import { Budget } from './entity/budget';
import { BudgetRepository } from './budget.repository';
import { UpdateBudgetDto, UpdateBudgetOutput } from './dto/update-budget.dto';

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
    const budgets = await this.budgetRepository.find({
      where: { userId: userId },
    });
    console.log(budgets);
    return budgets;
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

  async updateBudget(
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<UpdateBudgetOutput> {
    const budget = await this.budgetRepository.findOne({
      where: { id: updateBudgetDto.id },
    });
    if (!budget) {
      throw new NotFoundException(
        `Budget with id ${updateBudgetDto.id} not found`,
      );
    }

    Object.assign(budget, updateBudgetDto);

    const updatedBudget = await this.budgetRepository.save(budget);

    return {
      id: updatedBudget.id,
      amount: updatedBudget.amount,
      categoryId: updatedBudget.categoryId,
    };
  }

  async deleteBudget(budgetId: number): Promise<boolean> {
    const result = await this.budgetRepository.delete(budgetId);
    return result.affected > 0;
  }
}
