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
        <AddExpenseButton onAddExpense={handleAddExpense} />
      </View>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default App;