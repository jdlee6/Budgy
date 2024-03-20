import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateExpenseDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurring: boolean;

  @Field()
  userId: number;
}
