import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entity/user/user';
import { UserService } from './user.service';

// handles mutations and fetch logic
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('name') name: string, @Args('email') email: string) {
    return this.userService.create(name, email);
  }
}
