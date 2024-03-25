import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdatedDateColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entity/user';
import { Category } from 'src/category/entity/category';}

@Entity('budget')
@ObjectType()
export class Budget {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdatedDateColumn()
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