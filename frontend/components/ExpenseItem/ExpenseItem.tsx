// ExpenseItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ expense }) => {
  const date = new Date(expense.billingDate);
  const year = date.getFullYear().toString().slice(-2); // get last two digits of year
  const formattedDate = `${date.getMonth() + 1}.${date.getDate()}.${year}`;
    // Todo: move to utils folder
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  const capitalizedExpenseName = capitalize(expense.name);

  return (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseDate}>{formattedDate}</Text>
      <Text style={styles.expenseName}>{capitalizedExpenseName}</Text>
      <Text style={styles.expenseAmount}>${Number(expense.amount).toFixed(2)}</Text>
      <Text style={styles.expenseCategory}>{expense.category.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // light grey color
  },
  expenseDate: {
    flex: 1,
    color: '#527fd1',
  },
  expenseName: {
    flex: 2,
    color: '#527fd1',
  },
  expenseAmount: {
    flex: 1,
    textAlign: 'right',
    color: '#527fd1',
  },
  expenseCategory: {
    flex: 1,
    textAlign: 'right',
    color: '#527fd1',
  },
});

export default ExpenseItem;