import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateExpenseDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurrence: boolean;
}

@ObjectType()
export class UpdateExpenseOutput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurrence: boolean;
}
