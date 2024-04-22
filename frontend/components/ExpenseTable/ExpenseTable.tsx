import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import {LinearGradient} from 'expo-linear-gradient';
import { useMutation, gql, useQuery, useSubscription } from '@apollo/client';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useApolloClient } from '@apollo/client';
import ExpenseItem from '../ExpenseItem/ExpenseItem';

// do we want to use this query?
const GET_EXPENSES = gql`
  query {
    expensesByUserId(userId: 1) {
      id
      name
      billingDate
      amount
      categoryId
      category {
        name
      }
    }
  }
`

const DELETE_EXPENSE = gql`
  mutation DeleteExpense($id: Float!) {
    deleteExpense(id: $id)
  } 
`;

const ExpensesTable = () => {
  const client = useApolloClient();
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_EXPENSES);
  const [deleteExpense, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => {
      client.refetchQueries({ include: [GET_EXPENSES] });
    },
  });
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = React.useState<'date' | 'name' | 'amount' | 'category'>('date');

  const [sortedExpenses, setSortedExpenses] = React.useState([]);
  
  React.useEffect(() => {
    let expenses = data?.expensesByUserId || [];
  
    const newSortedExpenses = [...expenses].sort((a, b) => {
      let comparisonA, comparisonB;
  
      switch (sortField) {
        case 'date':
          comparisonA = new Date(a.billingDate).getTime();
          comparisonB = new Date(b.billingDate).getTime();
          break;
        case 'name':
          comparisonA = a.name.toLowerCase();
          comparisonB = b.name.toLowerCase();
          break;
        case 'amount':
          comparisonA = a.amount;
          comparisonB = b.amount;
          break;
        default:
          break;
      }
  
      if (sortOrder === 'asc') {
        return comparisonA < comparisonB ? -1 : 1;
      } else {
        return comparisonA > comparisonB ? -1 : 1;
      }
    });
  
    setSortedExpenses(newSortedExpenses);
    console.log(sortedExpenses);
  }, [data, sortOrder, sortField]);

  const handleDelete = async (id) => {
    // Optimistically remove the expense from the UI
    const newExpenses = sortedExpenses.filter(expense => expense.id !== id);
    setSortedExpenses(newExpenses);
  
    try {
      await deleteExpense({ variables: { id: parseFloat(id) } });
    } catch (err) {
      console.error(err);
      setSortedExpenses(sortedExpenses);
    }
  };

  const toggleSort = (field: 'date' | 'name' | 'amount' | 'category') => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  if (queryLoading) return <Text>Loading...</Text>;
  if (queryError) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.expenseItem}>
        <Text style={styles.expenseDate} onPress={() => toggleSort('date')}>Date</Text>
        <Text style={styles.expenseName} onPress={() => toggleSort('name')}>Name</Text>
        <Text style={styles.expenseAmount} onPress={() => toggleSort('amount')}>Amount</Text>
      </View>
      <SwipeListView
        data={sortedExpenses}
        renderItem={({ item: expense, index }) => (
          <ExpenseItem key={index} expense={expense} />
        )}
        renderHiddenItem={({ item: expense }, rowMap) => (
          <View style={styles.rowBack}>
            <Text style={styles.backTextWhite}>Edit</Text>
            <TouchableOpacity onPress={() => handleDelete(expense.id)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#a5d4f1', // light blue color
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
  rowBack: {
    alignItems: 'center', // Change this from 'center' to 'stretch'
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  backTextWhite: {
    color: '#FFF',
  },

  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff', // light grey color
  },
  expenseDate: {
    flex: 1,
    color: '#37393A',
    fontWeight: 'bold'
  },
  expenseName: {
    flex: 2,
    color: '#37393A',
    fontWeight: 'bold'
  },
  expenseAmount: {
    flex: 1,
    textAlign: 'right',
    color: '#37393A',
    fontWeight: 'bold'
  },
  expenseCategory: {
    flex: 1,
    textAlign: 'right',
    color: '#37393A',
    fontWeight: 'bold'
  },
});

export default ExpensesTable;