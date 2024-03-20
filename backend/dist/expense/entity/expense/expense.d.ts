import { User } from 'src/user/entity/user/user';
export declare class Expense {
    id: number;
    name: string;
    amount: number;
    recurring: boolean;
    user: User | null;
}
