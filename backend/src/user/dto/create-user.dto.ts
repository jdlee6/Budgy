import { ObjectType, InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  name: string;

  @Field()
  email: string;
}

@ObjectType()
export class CreateUserOutput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
