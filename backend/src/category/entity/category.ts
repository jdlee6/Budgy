import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from 'src/expense/entity/expense';
import { User } from 'src/user/entity/user';

@Entity('category')
@ObjectType()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.categories)
  @Field(() => User)
  user: User;

  @OneToMany(() => Expense, (expense) => expense.category)
  @Field(() => [Expense], { defaultValue: [] })
  expenses?: Expense[];
}
