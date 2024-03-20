import { Expense } from 'src/expense/entity/expense/expense';
export declare class User {
    id: number;
    name: string;
    email: string;
    password?: string;
    expense?: Expense[];
}
