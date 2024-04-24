import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useQuery } from '@apollo/client';
import { FinancialDataContext } from '../../context/FinancialDataContext';

import { GET_USER_BALANCES } from '../../graphql/queries';

const UserBalances = () => {
  const userId = 1;
  const { expenses, budgets, user } = useContext(FinancialDataContext);

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balanceAfterExpenses = (user.totalIncome - totalExpenses).toFixed(2);
  const date = new Date(Date.now())
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (expense.category) {
      acc[expense.category.name] = (acc[expense.category.name] || 0) + expense.amount;
    }
    return acc;
  }, {});
  const formattedBudgets = budgets.map(budget => ({ amount: budget.amount, categoryName: budget.category.name }));
  const budgetsAfterExpenses = formattedBudgets?.map(budget => {
    if (budget) {
      const totalExpenseForCategory = expensesByCategory[budget.categoryName] || 0;
      return { ...budget, remainingBudgetBalance: budget.amount - totalExpenseForCategory };
    }
    return null;
  }).filter(Boolean);

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error :(</Text>;

  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.income}>Monthly Income: ${user.totalIncome}</Text>
      <Text style={styles.income}>{formattedDate}</Text>
    </View>
    <Text style={styles.income}>Remaining Balance: ${balanceAfterExpenses}</Text>

    {/* 
      Todo: Percentage charts of budget used
    */}
    {budgetsAfterExpenses.map((budget, index) => {
      return (
        <View key={index} style={{ marginTop: 8 }}>
          <Text style={styles.income}>{budget.categoryName}</Text>
          <Text style={styles.income}>Balance: ${budget.remainingBudgetBalance} / ${budget.amount}</Text>
        </View>
      );
    })}
    </>
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

export default UserBalances;