import { Expense } from './entity/expense/expense';
import { User } from 'src/user/entity/user/user';
export declare class ExpenseService {
    private readonly expenses;
    findAll(): Promise<Expense[]>;
    create(name: string, amount: number, user: User, recurring: boolean): Promise<any>;
}
