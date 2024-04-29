import React, { useContext, useState } from 'react';
import { Text, StyleSheet, Animated, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import ExpensesTable from '../components/ExpenseTable/ExpenseTable';

import AddBtn from '../components/AddBtn/AddBtn';
import AddExpenseModal from '../components/AddExpenseModal/AddExpenseModal';
import AddCategoryModal from '../components/AddCategoryModal/AddCategoryModal';
import AddBudgetModal from '../components/AddBudgetModal/AddBudgetModal';
import { FinancialDataContext } from '../context/FinancialDataContext';
import { ModalContext } from '../context/ModalContext';
import UpdateExpenseModal from '../components/UpdateExpenseModal/UpdateExpenseModal';
// import UserBalances from '../components/UserBalances/UserBalances';
import Footer from '../components/shared/Footer/Footer';

import { GET_FINANCES_BY_USER_ID, GET_USER_BALANCES } from '../graphql/queries';
import { ADD_EXPENSE, ADD_BUDGET, UPDATE_EXPENSE } from '../graphql/mutations';

const Home = () => {
  const { updateExpenseModalVisible, updateExpenseId } = useContext(ModalContext);

  const { loading: queryLoading, error: queryError, data: financialData } = useQuery(GET_FINANCES_BY_USER_ID, {
    variables: { userId: 1 },
  });
  
  const { loading, error, data: balances, refetch: refetchUserBalances } = useQuery(GET_USER_BALANCES, {
    variables: { userId: 1 },
  });

  const [addExpense, { data: addExpenseData }] = useMutation(ADD_EXPENSE, {
    // only observes ACTIVE queries
    refetchQueries: [
      { query: GET_FINANCES_BY_USER_ID, variables: { userId: 1 } },
    ],
  });

  const [updateExpense, { data: updateExpenseData }] = useMutation(UPDATE_EXPENSE, {
    // only observes ACTIVE queries
    refetchQueries: [
      { query: GET_FINANCES_BY_USER_ID, variables: { userId: 1 } },
    ],
  })
  
  const [addBudget, { data: addBudgetData }] = useMutation(ADD_BUDGET, { refetchQueries: [{ query: GET_FINANCES_BY_USER_ID, variables: {userId: 1} }] });


  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [menuVisible, setMenuVisible] = useState(false);

  if (queryLoading) return <Text>Loading...</Text>;

  // const footerOpacity = scrollY.interpolate({
  //   inputRange: [0, 50],
  //   outputRange: [1, 0.5],
  //   extrapolate: 'clamp',
  // })

  return (
    <>
     <FinancialDataContext.Provider value={{ 
        addExpense, 
        addExpenseData, 
        updateExpense,
        updateExpenseData,
        expenses: financialData?.expensesByUserId, 
        addBudget, addBudgetData, 
        budgets: financialData?.budgetsByUserId,
        categories: financialData?.categoriesByUserId,
        user: financialData?.user,
        balances: balances,
        refetchUserBalances: refetchUserBalances
      }}>
        <ExpensesTable scrollY={scrollY} />
        <Footer menuVisible={menuVisible} setMenuVisible={setMenuVisible} />

        <AddExpenseModal />
        <AddCategoryModal />
        <AddBudgetModal />

        {updateExpenseModalVisible && <UpdateExpenseModal id={updateExpenseId} />}
      </FinancialDataContext.Provider>
    </>
  );
};

export default Home;