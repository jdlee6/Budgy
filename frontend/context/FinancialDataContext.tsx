import React from 'react';

export type FinancialDataInterface = {
  addExpense: any,
  addExpenseData: any,
  updateExpense: any,
  updateExpenseData: any,
  addBudget: any,
  addBudgetData: any,
  expenses: any,
  budgets: any,
  user: any,
  categories: any,
  balances: any,
  refetchUserBalances: any;
};

export const FinancialDataContext = React.createContext<FinancialDataInterface>({
  addExpense: null,
  addExpenseData: null,
  updateExpense: null,
  updateExpenseData: null,
  addBudget: null,
  addBudgetData: null,
  expenses: null,
  budgets: null,
  user: null,
  categories: null,
  balances: null,
  refetchUserBalances: null,
});