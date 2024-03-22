import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from 'src/expense/entity/expense';
import { Category } from 'src/category/entity/category';

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

  @Column({ type: 'timestamp', nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Expense, (expense) => expense.user)
  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
