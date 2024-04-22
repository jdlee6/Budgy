import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Category } from 'src/category/entity/category';
import { User } from 'src/user/entity/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('expense')
@ObjectType()
export class Expense {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("decimal", { precision: 5, scale: 2 })
  amount: number;

  @Field()
  @Column()
  recurrence: boolean;

  @Field()
  @Column()
  billingDate: Date;

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

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'userId' })
  user: User;

  // ManyToOne expense -> category
  @ManyToOne(() => Category, (category) => category.expenses)
  @JoinColumn({ name: 'categoryId' })
  @Field(() => Category)
  category: Category;
}
