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
    }
  }
`

const Users = () => {
  const userId = 1;
  const { loading, error, data, refetch } = useQuery(GET_USER_INCOME, {
    variables: { id: userId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const totalExpenses = data.expensesByUserId.reduce((total, expense) => total + expense.amount, 0);
  const balanceAfterExpenses = (data.user.totalIncome - totalExpenses).toFixed(2);
  const date = new Date(Date.now())
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.income}>Monthly Income: ${data.user.totalIncome}</Text>
      <Text style={styles.income}>{formattedDate}</Text>
    </View>
    <Text style={styles.income}>Remaining Balance: ${balanceAfterExpenses}</Text>
    </>
  );
};

const App = () => {
  const [expenseModalVisible, setExpenseModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const openExpenseModal = () => {
    setExpenseModalVisible(true);
    setCategoryModalVisible(false);
  };

  const openCategoryModal = () => {
    setExpenseModalVisible(false);
    setCategoryModalVisible(true);
  };

  const closeModals = () => {
    setExpenseModalVisible(false);
    setCategoryModalVisible(false);
  };

  React.useEffect(() => {
    console.log(expenseModalVisible, categoryModalVisible);
  }, [expenseModalVisible]);

  return (
    <ApolloProvider client={client}>
      <ModalContext.Provider value={{ expenseModalVisible, categoryModalVisible, openExpenseModal, openCategoryModal, closeModals }}>
        <View style={styles.container}>
          <Text style={styles.title}>Budgy</Text>

          {/* Component to display current budgets */}
          <Users />

          <ExpensesTable />
          <AddBtn />
          <AddExpenseModal />
          <AddCategoryModal />
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