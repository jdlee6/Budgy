import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category';

export class CategoryRepository extends Repository<Category> {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {
    super(
      categoryRepository.target,
      categoryRepository.manager,
      categoryRepository.queryRunner,
    );
  }

  async findExpensesByCategoryId(categoryId: number) {
    try {
      return await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['expenses'],
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}
