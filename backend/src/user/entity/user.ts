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

  // Column isn't needed bc its a relation
  @OneToMany(() => Expense, (expense) => expense.user)
  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  // OneToMany user -> categories
}
