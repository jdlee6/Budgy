import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBudgetDto {
  @Field(() => ID)
  id: number;

  @Field()
  amount: number;
}

@ObjectType()
export class UpdateBudgetOutput {
  @Field()
  id: number;

  @Field()
  amount: number;

  @Field()
  categoryId: number;
}
