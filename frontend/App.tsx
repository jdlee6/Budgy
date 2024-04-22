import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import ExpensesTable from './components/ExpenseTable/ExpenseTable';
import AddExpenseButton from './components/AddExpenseBtn/AddExpenseBtn';
import { StatusBar } from 'react-native';

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
  const balanceAfterExpenses = data.user.totalIncome - totalExpenses;

  return (
    <View>
      <Text style={styles.income}>Total Income: ${data.user.totalIncome}</Text>
      {/* Todo: change */}
      <Text style={styles.income}>Balance after expenses: ${balanceAfterExpenses}</Text>
    </View>
  );
};

const App = () => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleAddExpense = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };
  
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Text style={styles.title}>Budgy</Text>

        {/* Component to display current budgets */}
        <Users />

        {/* Grid component to show expenses */}
        <ExpensesTable />


        {/* Button to add expense */}
        <View style={styles.buttonContainer}>
          <AddExpenseButton onAddExpense={handleAddExpense}/>
        </View>
      </View>
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
    paddingLeft: 16
  },
  title: {
    borderRadius: 6,
    color: '#a2bbf6',
    fontSize: 24,
    marginTop: 50,
    padding: 16,
    backgroundColor: '#FFFFFF', // Set the background color to white
  },
  buttonContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: 16, // Add padding
  },
  // ..
  // ...
});

export default App;