import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  paycheck1?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  paycheck2?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  side_income?: number;
}

@ObjectType()
export class CreateUserOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  totalIncome: number;
}
