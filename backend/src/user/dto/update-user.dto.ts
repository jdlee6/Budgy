import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class UpdateUserOutput {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
