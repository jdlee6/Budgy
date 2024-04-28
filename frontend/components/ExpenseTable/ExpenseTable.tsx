import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { SwipeListView } from 'react-native-swipe-list-view';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import { FinancialDataContext } from '../../context/FinancialDataContext';

import { GET_FINANCES_BY_USER_ID } from '../../graphql/queries';
import { DELETE_EXPENSE } from '../../graphql/mutations';
import UserBalances from '../UserBalances/UserBalances';
import AddBtn from '../AddBtn/AddBtn';
import { ModalContext } from '../../context/ModalContext';

const AnimatedSwipeListView = Animated.createAnimatedComponent(SwipeListView);

const ExpensesTable = ({ scrollY }) => {
  const { expenses, addExpenseData } = useContext(FinancialDataContext);
  const { openUpdateExpenseModal } = useContext(ModalContext);
  const [deleteExpense, { loading: mutationLoading, error: mutationError }] = useMutation(DELETE_EXPENSE, {
    variables: { id: 1 },
    refetchQueries: [
      { query: GET_FINANCES_BY_USER_ID, variables: { userId: 1 } },
    ],
  });

  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = React.useState<'date' | 'name' | 'amount' | 'category'>('date');
  const [sortedExpenses, setSortedExpenses] = React.useState([]);

  React.useEffect(() => {
    setSortedExpenses(expenses)
  }, [expenses]);

  React.useEffect(() => {
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
  }, [expenses, sortOrder, addExpenseData, sortField]);

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

  const handleUpdateExpense = (id: number) => {
    openUpdateExpenseModal(id);
  };

  const toggleSort = (field: 'date' | 'name' | 'amount' | 'category') => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // if (queryLoading) return <Text>Loading...</Text>;
  // if (queryError) return <Text>Error :(</Text>;

  return (
    <View style={styles.container}>
      
      <AnimatedSwipeListView
        data={sortedExpenses}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListHeaderComponent={
        <>
          <UserBalances />
          <View style={styles.expenseItem}>
            <Text style={styles.expenseDate} onPress={() => toggleSort('date')}>Date</Text>
            <Text style={styles.expenseName} onPress={() => toggleSort('name')}>Name</Text>
            <Text style={styles.expenseAmount} onPress={() => toggleSort('amount')}>Amount</Text>
          </View>
        </>
        } 
        // ListFooterComponent={<AddBtn />}
        renderItem={({ item: expense, index }) => (
          <ExpenseItem key={index} expense={expense} />
        )}
        renderHiddenItem={({ item: expense }, rowMap) => (
          <View style={styles.rowBack}>
            {/* open edit modal */}
            <Text style={styles.backTextWhite} onPress={() => handleUpdateExpense(expense.id)}>Edit</Text>
            <TouchableOpacity onPress={() => handleDelete(expense.id)}>
              <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 8,
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
    alignItems: 'center',
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
    flex: 0.75,
    color: '#37393A',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expenseName: {
    flex: 2,
    color: '#37393A',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expenseAmount: {
    flex: 1,
    textAlign: 'right',
    color: '#37393A',
    fontWeight: 'bold',
    fontSize: 12,
  },
  expenseCategory: {
    flex: 1,
    textAlign: 'right',
    color: '#37393A',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ExpensesTable;