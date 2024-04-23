import React from 'react';

export type UserActionDataInterface = {
  addExpense: any,
  addExpenseData: any,
  expenses: any,
  expensesLoading: boolean,
  refetchBalances: () => void,
  balances: any,
  // addBudgetData: any,
  // addCategoryData: any
};

export const UserActionDataContext = React.createContext<UserActionDataInterface>({
  addExpense: null,
  addExpenseData: null,
  expenses: null,
  expensesLoading: false,
  refetchBalances: () => {},
  balances: null,
  // addBudgetData: null,
  // addCategoryData: null,
});