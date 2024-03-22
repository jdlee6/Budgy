import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entity/user';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
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
  @Column()
  amount: number;

  @Field()
  @Column()
  recurring: boolean;

  @Field()
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.expenses)
  @JoinColumn({ name: 'userId' })
  user: User;

  // OneToOne expense -> category
}
