import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  // You might not want to expose the password through GraphQL
  // Omit @Field() decorator for password field if you don't want to expose it
  @Field()
  password: string;
}
