import { Repository } from 'typeorm';
import { Expense } from './entity/expense/expense';
export declare class ExpenseRepository extends Repository<Expense> {
    private expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
    findByEmail(name: string): Promise<Expense>;
}
