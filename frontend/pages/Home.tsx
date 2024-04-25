import React from 'react';
import { Text, StyleSheet  } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import ExpensesTable from '../components/ExpenseTable/ExpenseTable';

import AddBtn from '../components/AddBtn/AddBtn';
import AddExpenseModal from '../components/AddExpenseModal/AddExpenseModal';
import AddCategoryModal from '../components/AddCategoryModal/AddCategoryModal';
import AddBudgetModal from '../components/AddBudgetModal/AddBudgetModal';
import { FinancialDataContext } from '../context/FinancialDataContext';
import UserBalances from '../components/UserBalances/UserBalances';
import Footer from '../components/shared/Footer/Footer';

import { GET_FINANCES_BY_USER_ID, GET_USER_BALANCES } from '../graphql/queries';
import { ADD_EXPENSE, ADD_BUDGET } from '../graphql/mutations';

const Home = () => {
  const { loading: queryLoading, error: queryError, data: financialData } = useQuery(GET_FINANCES_BY_USER_ID, {
    variables: { userId: 1 },
  });
  
  const { loading, error, data } = useQuery(GET_USER_BALANCES, {
    variables: { userId: 1 },
  });

  const [addExpense, { data: addExpenseData }] = useMutation(ADD_EXPENSE, {
    // only observes ACTIVE queries
    refetchQueries: [
      { query: GET_FINANCES_BY_USER_ID, variables: { userId: 1 } },
    ],
  });

  const [addBudget, { data: addBudgetData }] = useMutation(ADD_BUDGET, { refetchQueries: [{ query: GET_FINANCES_BY_USER_ID, variables: {userId: 1} }] });


  React.useEffect(() => {console.log(financialData?.categoriesByUserId)}, [queryLoading]);

  if (queryLoading) return <Text>Loading...</Text>;

  return (
    <>
     {/* Todo: Context for Data */}
     <FinancialDataContext.Provider value={{ 
        addExpense, 
        addExpenseData, 
        expenses: financialData?.expensesByUserId, 
        addBudget, addBudgetData, 
        budgets: financialData?.budgetsByUserId,
        categories: financialData?.categoriesByUserId,
        user: financialData?.user,
      }}>

        <UserBalances />
        <ExpensesTable />
        <AddBtn />
        <Footer />

        <AddExpenseModal />
        <AddCategoryModal />
        <AddBudgetModal />
      </FinancialDataContext.Provider>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
});
