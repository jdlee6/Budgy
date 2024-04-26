import { gql } from '@apollo/client';

export const ADD_EXPENSE = gql`
  mutation AddExpense($newExpenseInput: CreateExpenseDto!) {
    createExpense(newExpenseInput: $newExpenseInput) {
      name
      amount
      recurrence
      billingDate
      userId
      categoryId
    }
  }
`

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: Float!) {
    deleteExpense(id: $id)
  } 
`;

export const ADD_BUDGET = gql`
  mutation AddBudget($newBudgetInput: CreateBudgetDto!) {
    createBudget(newBudgetInput: $newBudgetInput) {
      id
      amount
      userId
      categoryId
    }
  }
`
