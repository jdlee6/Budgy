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
import { Budget } from 'src/budget/entity/budget';

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

  // Todo: add hash to encrypt password
  @Column()
  password?: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoggedIn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column('decimal')
  paycheck1: number;

  @Field()
  @Column('decimal')
  paycheck2: number;

  @Field()
  @Column('decimal')
  side_income: number;

  @Field()
  get totalIncome(): number {
    return Number(this.paycheck1) + Number(this.paycheck2) + Number(this.side_income);
  }

  @OneToMany(() => Budget, (budget) => budget.user)
  @Field(() => [Budget], { nullable: true })
  budgets?: Budget[];

  @OneToMany(() => Expense, (expense) => expense.user)
  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @OneToMany(() => Category, (category) => category.user)
  @Field(() => [Category], { nullable: true })
  categories?: Category[];
}
