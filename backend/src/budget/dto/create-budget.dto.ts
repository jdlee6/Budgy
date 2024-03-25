import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBudgetDto {
  @Field()
  name: string;

  @Field()
  amount: number;

  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  categoryId: number;
}

@ObjectType()
export class CreateBudgetOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field(() => ID)
  userId: number;

  @Field(() => ID)
  categoryId: number;
}
