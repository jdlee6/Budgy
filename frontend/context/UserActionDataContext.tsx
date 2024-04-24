import React from 'react';

export type UserActionDataInterface = {
  addExpense: any,
  addExpenseData: any,
  expenses: any,
  expensesLoading: boolean,
};

export const UserActionDataContext = React.createContext<UserActionDataInterface>({
  addExpense: null,
  addExpenseData: null,
  expenses: null,
  expensesLoading: false,
});