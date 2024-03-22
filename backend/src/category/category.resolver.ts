import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Category } from './entity/category';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  CreateCategoryOutput,
} from './dto/create-category.dto';
import {
  UpdateCategoryDto,
  UpdateCategoryOutput,
} from './dto/update-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category)
  async expensesByCategoryId(
    @Args('categoryId') categoryId: number,
  ): Promise<any> {
    return this.categoryService.findExpensesByCategoryId(categoryId);
  }

  @Mutation(() => CreateCategoryOutput)
  async createCategory(
    @Args('newCategoryInput') newCategoryInput: CreateCategoryDto,
  ) {
    return this.categoryService.create(newCategoryInput);
  }

  @Mutation(() => UpdateCategoryOutput)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(updateCategoryInput);
  }

  // @Mutation(() => User)
  // async deleteUser(@Args('id') userId: number) {
  //   return this.userService.deleteUser(userId);
  // }
}
