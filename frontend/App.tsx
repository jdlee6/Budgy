import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import ExpensesTable from './components/ExpenseTable/ExpenseTable';
import AddExpenseButton from './components/AddExpenseBtn/AddExpenseBtn';

const client = new ApolloClient({
  uri: 'http://192.168.1.158:3000/graphql',
  cache: new InMemoryCache(),
});

// const GET_USERS = gql`
// query {
//   users {
//     name
//     email
//     expenses {
//       id
//       amount
//       name
//       categoryId
//     }
//     categories {
//       id
//       name
//     }
//     budgets {
//       id
//       amount
//       categoryId
//     }
//   }
// }
// `;

// const Users = () => {
//   const { loading, error, data } = useQuery(GET_USERS);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error :(</Text>;

//   return (
//     <View style={styles.container}>
//       {data.users.map((user: any) => (
//         <Text key={user.id}>{user.name}</Text>
//       ))}
//     </View>
//   );
// };

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
        {/* <Users /> */}

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
  // ...
  title: {
    // position: 'absolute', // Position the title absolutely
    top: 50, // Adjust the top position
    left: 16, // Adjust the left position
    paddingVertical: 8,
    borderRadius: 6,
    color: '#20232a',
    fontSize: 24,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: 16, // Add padding
  },
  // ..
  // ...
});

export default App;