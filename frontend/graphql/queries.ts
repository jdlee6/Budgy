import { gql } from '@apollo/client';

export const GET_EXPENSES_AND_CATEGORIES_BY_USER_ID = gql`
  query GetExpensesAndCategoriesByUserId($userId: Float!) {
    expensesByUserId(userId: $userId) {
      id
      name
      billingDate
      amount
      categoryId
      category { 
        id
        color
        name
      }
    }
    categoriesByUserId(userId: $userId) {
      name
    }
  }
`;

export const GET_USER_BALANCES = gql`
  query GetUserIncome($id: Float!) {
    user(id: $id) {
      name
      totalIncome
    }
    budgetsByUserId(userId: $id) {
      amount
      category { 
        name
      }
    }
  }
`