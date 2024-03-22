import { InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
export class CreateExpenseDto {
  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurrence: boolean;

  @Field()
  billingDate: Date;

  @Field()
  userId: number;
}

@ObjectType()
export class CreateExpenseOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  amount: number;

  @Field()
  recurrence: boolean;

  @Field()
  billingDate: Date;

  @Field()
  userId: number;
}
