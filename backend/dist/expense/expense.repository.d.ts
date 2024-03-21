import { Repository } from 'typeorm';
import { Expense } from './entity/expense';
export declare class ExpenseRepository extends Repository<Expense> {
    private expenseRepository;
    constructor(expenseRepository: Repository<Expense>);
}
