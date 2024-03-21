import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from 'src/expense/entity/expense';

@Entity('user')
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  // dont want to expose password in gql response
  @Column()
  password?: string;

  @OneToMany(() => Expense, (expense) => expense.user)
  expense?: Expense[];

  // OneToMany user -> categories
}
