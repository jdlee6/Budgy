import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import {LinearGradient} from 'expo-linear-gradient';
import { gql, useQuery } from '@apollo/client';

// do we want to use this query?
const GET_EXPENSES = gql`
  query {
    expensesByUserId(userId: 1) {
      expenses {
        id
        name
        billingDate
        amount
        categoryId
      }
    }
  }
`

const ExpensesTable = () => {
  const { loading, error, data } = useQuery(GET_EXPENSES);

  // Todo: move to utils folder
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  return (
      <View style={styles.table}>
        <View style={styles.row}>
        <Text style={styles.header}>Date</Text>
        <Text style={styles.header}>Name</Text>
          <Text style={styles.header}>Amount</Text>
          <Text style={styles.header}>Category</Text>
        </View>
        {data.expensesByUserId.expenses.map((expense) => {
          const date = new Date(expense.billingDate);
          const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
          const capitalizedExpenseName = capitalize(expense.name);

          return (
            <View key={expense.id} style={styles.row}>
              <Text style={styles.cell}>{formattedDate}</Text>
              <Text style={styles.cell}>{capitalizedExpenseName}</Text>
              <Text style={styles.cell}>{Number(expense.amount).toFixed(2)}</Text>
              <Text style={styles.cell}>{expense.categoryId}</Text>
            </View>
        )})}
      </View>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  cell: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  gradient: {
    flex: 1,
  },
});

export default ExpensesTable;