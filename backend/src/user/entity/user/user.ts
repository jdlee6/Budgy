import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, OneToMany } from 'typeorm';
import { Expense } from 'src/expense/entity/expense/expense';

@ObjectType()
export class User {
  @Field(() => ID)
  @Column()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  // dont want to expose password in gql response
  @Column()
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expense?: Expense[];

  // OneToMany user -> categories
}
