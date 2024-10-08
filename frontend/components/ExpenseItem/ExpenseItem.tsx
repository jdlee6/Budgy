import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ expense }) => {
  const date = new Date(expense.billingDate);
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}.${date.getFullYear().toString().slice(-2)}`;
  // Todo: move to utils folder
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const capitalizedExpenseName = capitalize(expense.name);

  return (
    <>
      <View style={styles.expenseItem}>
        <Text style={styles.expenseDate}>{formattedDate}</Text>
        <View style={styles.expenseNameCategory}>
          <Text style={styles.expenseName}>{capitalizedExpenseName}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.colorPreview, { backgroundColor: expense.category.color || 'white' }]} />
            <Text style={styles.expenseCategory}>{expense.category.name}</Text>
          </View>
  
        </View>
        <Text style={styles.expenseAmount}>${Number(expense.amount).toFixed(2)}</Text>
      </View>
      {/* <View style={styles.divider} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: .5,
    backgroundColor: '#D3D3D3', // light grey color
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff', // light grey color
  },
  expenseDate: {
    flex: 0.75,
    color: '#9aa3ab',
    fontSize: 12,
  },
  expenseNameCategory: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  expenseName: {
    color: '#37393A',
    fontWeight: 'bold',
    fontSize: 14, // larger font size
  },
  expenseCategory: {
    color: '#7c7e80',
    fontSize: 12, // smaller font size
  },
  expenseAmount: {
    flex: 1,
    textAlign: 'right',
    color: '#527fd1',
  },
  colorPreview: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 4,
  },
});

export default ExpenseItem;