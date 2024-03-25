import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entity/user';
import { Category } from 'src/category/entity/category';

@Entity('budget')
@ObjectType()
export class Budget {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.budgets)
  @Field(() => User)
  user: User;

  @OneToOne(() => Category, (category) => category.budget)
  @Field(() => Category)
  category: Category;
}
