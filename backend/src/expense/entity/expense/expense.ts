import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entity/user/user';
import { Column, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, { nullable: true })
  user: User | null;

  // OneToOne expense -> category
}
