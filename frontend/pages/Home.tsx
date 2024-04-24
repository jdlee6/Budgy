import React from 'react';
import { Text } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import ExpensesTable from '../components/ExpenseTable/ExpenseTable';

import AddBtn from '../components/AddBtn/AddBtn';
import AddExpenseModal from '../components/AddExpenseModal/AddExpenseModal';
import AddCategoryModal from '../components/AddCategoryModal/AddCategoryModal';
import AddBudgetModal from '../components/AddBudgetModal/AddBudgetModal';
import { UserActionDataContext } from '../context/UserActionDataContext';
import UserBalances from '../components/UserBalances/UserBalances';

import { GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, GET_USER_BALANCES } from '../graphql/queries';
import { ADD_EXPENSE } from '../graphql/mutations';

const Home = () => {
  const { loading: expensesLoading, error: queryError, data: expensesData } = useQuery(GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, {
    variables: { userId: 1 },
  });
  
  const { loading, error, data } = useQuery(GET_USER_BALANCES, {
    variables: { userId: 1 },
  });

  const [addExpense, { data: addExpenseData }] = useMutation(ADD_EXPENSE, {
    // only observes ACTIVE queries
    refetchQueries: [
      { query: GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, variables: { userId: 1 } },
    ],
  });

  if (expensesLoading) return <Text>Loading...</Text>;

  return (
    <>
     {/* Todo: Context for Data */}
      <UserActionDataContext.Provider value={{ addExpense, addExpenseData, expenses: expensesData?.expensesByUserId, expensesLoading }}>
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