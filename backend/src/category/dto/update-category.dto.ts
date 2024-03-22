import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from 'src/expense/entity/expense';

@InputType()
export class UpdateCategoryDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  color: string;
}

@ObjectType()
export class UpdateCategoryOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  color: string;

  @Field(() => [Expense], { defaultValue: [] })
  expenses: Expense[];
}
