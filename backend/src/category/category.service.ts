import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  CreateCategoryOutput,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateCategoryOutput,
} from './dto/update-category.dto';
import { Category } from './entity/category';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    return category;
  }

  async findCategoriesByUserId(userId: number): Promise<Category[]> {
    return this.categoryRepository.find({ where: { userId } });
  }

  async findExpensesByCategoryId(categoryId: number) {
    const category =
      await this.categoryRepository.findExpensesByCategoryId(categoryId);
    return category;
  }

  async create(
    newCategoryInput: CreateCategoryDto,
  ): Promise<CreateCategoryOutput> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: newCategoryInput.name },
    });
    if (existingCategory) {
      throw new Error(`Category ${newCategoryInput.name} already exists!`);
    }

    const category = new Category();
    category.name = newCategoryInput.name;
    category.color = newCategoryInput.color;
    category.expenses = [];
    category.userId = newCategoryInput.userId;

    const savedCategory = await this.categoryRepository.save(category);

    return {
      id: savedCategory.id,
      name: savedCategory.name,
      color: savedCategory.color,
      expenses: savedCategory.expenses,
      userId: savedCategory.userId,
    };
  }

  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.findOne({
      where: { id: updateCategoryDto.id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${updateCategoryDto.id} not found`,
      );
    }

    Object.assign(category, updateCategoryDto);

    const updatedCategory = await this.categoryRepository.save(category);

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      color: updatedCategory.color,
      expenses: updatedCategory.expenses,
    };
  }

  async deleteCategory(CategoryId: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(CategoryId);
    return result.affected > 0;
  }
}
