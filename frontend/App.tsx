import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import ExpensesTable from './components/ExpenseTable/ExpenseTable';
// import { StatusBar } from 'react-native';
// import AddCategoryButton from './components/AddCategoryModal/AddCategoryModal';

import AddBtn from './components/AddBtn/AddBtn';
import AddExpenseModal from './components/AddExpenseModal/AddExpenseModal';
import AddCategoryModal from './components/AddCategoryModal/AddCategoryModal';
import { ModalContext } from './context/ModalContext';
import AddBudgetModal from './components/AddBudgetModal/AddBudgetModal';

const client = new ApolloClient({
  uri: 'http://192.168.1.158:3000/graphql',
  cache: new InMemoryCache(),
});


const GET_USER_INCOME = gql`
  query GetUserIncome($id: Float!) {
    user(id: $id) {
      name
      totalIncome
    }
    expensesByUserId(userId: $id) {
      amount
      category { 
        name
      }
    }
    budgetsByUserId(userId: $id) {
      amount
      category { 
        name
      }
    }
  }
`

const Users = ({ onRefetch}) => {
  const userId = 1;
  const { loading, error, data, refetch } = useQuery(GET_USER_INCOME, {
    variables: { id: userId },
  });

  React.useEffect(() => {
    console.log('refetch:', refetch);
    onRefetch(refetch);
  }, [onRefetch, refetch]);

  const totalExpenses = data?.expensesByUserId.reduce((total, expense) => total + expense.amount, 0);
  const balanceAfterExpenses = (data?.user.totalIncome - totalExpenses).toFixed(2);
  const date = new Date(Date.now())
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const expensesByCategory = data?.expensesByUserId.reduce((acc, expense) => {
    if (expense.category) {
      acc[expense.category.name] = (acc[expense.category.name] || 0) + expense.amount;
    }
    return acc;
  }, {});

  const budgets = data?.budgetsByUserId.map(budget => budget.category ? ({ amount: budget.amount, categoryName: budget.category.name }) : null);

  const budgetsAfterExpenses = budgets?.map(budget => {
    if (budget) {
      const totalExpenseForCategory = expensesByCategory[budget.categoryName] || 0;
      return { ...budget, remainingBudgetBalance: budget.amount - totalExpenseForCategory };
    }
    return null;
  }).filter(Boolean);

  console.log(budgets, budgetsAfterExpenses)
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.income}>Monthly Income: ${data.user.totalIncome}</Text>
      <Text style={styles.income}>{formattedDate}</Text>
    </View>
    <Text style={styles.income}>Remaining Balance: ${balanceAfterExpenses}</Text>

    {/* 
      Todo: Percentage charts of budget used
    */}
    {budgetsAfterExpenses.map((budget, index) => {
      return (
        <View key={index} style={{ marginTop: 8 }}>
          <Text style={styles.income}>{budget.categoryName}</Text>
          <Text style={styles.income}>Balance: ${budget.remainingBudgetBalance} / ${budget.amount}</Text>
        </View>
      );
    })}
    </>
  );
};

const App = () => {
  const [expenseModalVisible, setExpenseModalVisible] = useState<boolean>(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState<boolean>(false);
  const [refetchUserIncome, setRefetchUserIncome] = useState(null);

  React.useEffect(() => {
    console.log('refetchUserIncome:', refetchUserIncome);
  }, [refetchUserIncome]);

  const openExpenseModal = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(false);
    setExpenseModalVisible(true);
  };

  const openCategoryModal = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(true);
    setExpenseModalVisible(false);
  };

  const openBudgetModal = () => {
    setBudgetModalVisible(true);
    setCategoryModalVisible(false);
    setExpenseModalVisible(false);
  };

  const closeModals = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(false);
    setExpenseModalVisible(false);
  };

  return (
    <ApolloProvider client={client}>
      <ModalContext.Provider value={{ expenseModalVisible, categoryModalVisible, budgetModalVisible, openExpenseModal, openCategoryModal, openBudgetModal, closeModals, refetchUserIncome }}>
        <View style={styles.container}>
          <Text style={styles.title}>Budgy</Text>

          {/* Component to display current budgets */}
          <Users onRefetch={setRefetchUserIncome} />

          <ExpensesTable />
          <AddBtn />
          <AddExpenseModal />
          <AddCategoryModal />
          <AddBudgetModal />

        </View>
      </ModalContext.Provider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff', // light grey color
  },
  income: {
    paddingLeft: 16,
    paddingRight: 16,
    color: '#7c7e80',
  },
  title: {
    borderRadius: 6,
    color: '#a2bbf6',
    fontSize: 24,
    marginTop: 40,
    padding: 16,
    backgroundColor: '#FFFFFF', // Set the background color to white
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'flex-start', // Center items vertically
    padding: 16, // Add padding
  },
  // ..
  // ...
});

export default App;