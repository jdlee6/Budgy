import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entity/user/user';
import { Column, ManyToOne, JoinColumn } from 'typeorm';

@ObjectType()
export class Expense {
  @Field(() => ID)
  @Column()
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  // OneToOne expense -> category
}
