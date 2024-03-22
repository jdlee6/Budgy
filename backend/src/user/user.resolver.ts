import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entity/user';
import { UserService } from './user.service';
import { CreateUserDto, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserOutput } from './dto/update-user.dto';
import { Expense } from 'src/expense/entity/expense';

// handles mutations and fetch logic
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async expensesByUserId(@Args('userId') userId: number): Promise<any> {
    return this.userService.findExpensesByUserId(userId);
  }

  @Mutation(() => CreateUserOutput)
  async createUser(@Args('newUserInput') newUserInput: CreateUserDto) {
    return this.userService.create(newUserInput);
  }

  @Mutation(() => UpdateUserOutput)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserDto) {
    return this.userService.updateUser(updateUserInput);
  }

  // @Mutation(() => User)
  // async deleteUser(@Args('id') userId: number) {
  //   return this.userService.deleteUser(userId);
  // }
}
