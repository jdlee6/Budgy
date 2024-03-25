import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entity/budget';

export class BudgetRepository extends Repository<Budget> {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {
    super(
      budgetRepository.target,
      budgetRepository.manager,
      budgetRepository.queryRunner,
    );
  }

  async findBudgetsByUserId(userId: number) {
    try {
      return await this.budgetRepository.find({
        where: { userId: userId },
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
