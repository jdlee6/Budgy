import { gql } from '@apollo/client';

export const GET_FINANCES_BY_USER_ID = gql`
  query GetFinancesByUserId($userId: Float!) {
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
    budgetsByUserId(userId: $userId) {
      id
      amount
      categoryId
      category { 
        name
        color
      }
    }
    categoriesByUserId(userId: $userId) {
      id
      name
    }
    user(id: $userId) {
      name
      totalIncome
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