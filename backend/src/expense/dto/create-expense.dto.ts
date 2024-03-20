import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpenseDto {
  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurring: boolean;

  @Field()
  userId: number;
}

@ObjectType()
export class CreateExpenseOutput {
  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurring: boolean;

  @Field()
  userId: number;
}
