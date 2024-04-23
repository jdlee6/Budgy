import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import ExpensesTable from '../components/ExpenseTable/ExpenseTable';

import AddBtn from '../components/AddBtn/AddBtn';
import AddExpenseModal from '../components/AddExpenseModal/AddExpenseModal';
import AddCategoryModal from '../components/AddCategoryModal/AddCategoryModal';
import AddBudgetModal from '../components/AddBudgetModal/AddBudgetModal';
import { UserActionDataContext } from '../context/UserActionDataContext';
import UserBalances from '../components/UserBalances/UserBalances';

const ADD_EXPENSE = gql`
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

const GET_EXPENSES_AND_CATEGORIES_BY_USER_ID = gql`
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


const GET_USER_BALANCES = gql`
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

const Home = () => {
  // Define Query calls here
  const { loading: expensesLoading, error: queryError, data: expensesData } = useQuery(GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, {
    variables: { userId: 1 },
  });

  const [addExpense, { data: addExpenseData }] = useMutation(ADD_EXPENSE, {
    // only observes ACTIVE queries
    refetchQueries: [
      { query: GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, variables: { userId: 1 } },
    ],
  });

  const { loading, error, data: balanceData, refetch: refetchBalances } = useQuery(GET_USER_BALANCES, {
    variables: { userId: 1 },
  });

  if (expensesLoading) return <Text>Loading...</Text>;

  return (
    <>
     {/* Todo: Context for Data */}
      <UserActionDataContext.Provider value={{ addExpense, addExpenseData, expenses: expensesData?.expensesByUserId, expensesLoading, balances: balanceData, refetchBalances }}>
        <UserBalances />
        <ExpensesTable />
        <AddBtn />

        <AddExpenseModal />
        <AddCategoryModal />
        <AddBudgetModal />
      </UserActionDataContext.Provider>
    </>
  );
};

export default Home;