export declare class CreateExpenseDto {
    name: string;
    amount: number;
    recurrence: boolean;
    billingDate: Date;
    userId: number;
}
export declare class CreateExpenseOutput {
    id: number;
    name: string;
    amount: number;
    recurrence: boolean;
    billingDate: Date;
    userId: number;
}
