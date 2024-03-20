import { Expense } from './entity/expense/expense';
import { ExpenseRepository } from './expense.repository';
import { CreateExpenseDto, CreateExpenseOutput } from './dto/create-expense.dto';
import { UpdateExpenseDto, UpdateExpenseOutput } from './dto/update-expense.dto';
export declare class ExpenseService {
    private readonly expenseRepository;
    private readonly expenses;
    constructor(expenseRepository: ExpenseRepository);
    findAll(): Promise<Expense[]>;
    create(newExpenseInput: CreateExpenseDto): Promise<CreateExpenseOutput>;
    updateExpense(updateExpenseDto: UpdateExpenseDto): Promise<UpdateExpenseOutput>;
    deleteExpense(expenseId: number): Promise<boolean>;
}
