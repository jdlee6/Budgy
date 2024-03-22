import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from 'src/expense/entity/expense';

@InputType()
export class CreateCategoryDto {
  @Field()
  name: string;

  @Field()
  color: string;

  @Field(() => ID)
  userId: number;
}

@ObjectType()
export class CreateCategoryOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field(() => [Expense], { defaultValue: [] })
  expenses: Expense[];

  @Field(() => ID)
  userId: number;
}
