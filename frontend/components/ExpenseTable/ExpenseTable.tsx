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
  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);

  // Todo: move to utils folder
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  React.useEffect(() => {
    refetch();
  }, [data])

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
        {data.expensesByUserId.expenses.map((expense, index) => {
          const date = new Date(expense.billingDate);
          const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
          const capitalizedExpenseName = capitalize(expense.name);

          return (
            <View key={expense.id} style={[styles.row, index % 2 === 1 ? styles.alternateRow : null]}>
              <Text style={styles.cell}>{formattedDate}</Text>
              <Text style={styles.cell}>{capitalizedExpenseName}</Text>
              <Text style={styles.cell}>${Number(expense.amount).toFixed(2)}</Text>
              <Text style={styles.cell}>{expense.categoryId}</Text>
            </View>
        )})}
      </View>
  );
};

const styles = StyleSheet.create({
  table: {
    marginTop: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  alternateRow: {
    backgroundColor: '#f9f9f9',
  },
  header: {
    flex: 1,
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 0.2,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: .2,
    borderColor: '#ddd',
    fontSize: 14,
  },
  gradient: {
    flex: 1,
  },
});

export default ExpensesTable;