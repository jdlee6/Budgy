import { Expense } from './entity/expense';
import { ExpenseService } from './expense.service';
import { UpdateExpenseDto, UpdateExpenseOutput } from './dto/update-expense.dto';
import { CreateExpenseDto, CreateExpenseOutput } from './dto/create-expense.dto';
export declare class ExpenseResolver {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    expenses(): Promise<Expense[]>;
    createExpense(newExpenseInput: CreateExpenseDto): Promise<CreateExpenseOutput>;
    updateExpense(updateExpenseInput: UpdateExpenseDto): Promise<UpdateExpenseOutput>;
}
