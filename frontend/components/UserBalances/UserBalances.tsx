import React, { useContext } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { FinancialDataContext } from '../../context/FinancialDataContext';
// import { useQuery } from '@apollo/client';
// import { GET_USER_BALANCES } from '../../graphql/queries';
import { LinearGradient } from "expo-linear-gradient";


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
  const formattedBudgets = budgets.map(budget => ({ amount: budget.amount, categoryName: budget.category.name, categoryColor: budget.category.color }));
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
       const progress = budget.remainingBudgetBalance / budget.amount;
        return (
          <View key={index} style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{ marginLeft: 16, flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.colorPreview, { backgroundColor: budget.categoryColor || 'white' }]} />
                <Text style={styles.remaining}>{budget.categoryName}</Text>
              </View>
              <Text style={styles.income}>Balance: ${budget.remainingBudgetBalance} / ${budget.amount}</Text>
            </View>

            <View style={{width: 140, height: 12, margin: 16, borderRadius: 10, overflow: 'hidden', backgroundColor: '#e4e4e4'}}>
              <View style={{width: progress * 140, height: 20}}>
                <LinearGradient colors={['#a1e8a0', '#d4e3cf']} 
                  start={{x: 0, y: 0}} 
                  end={{x: 1, y: 0}} 
                  style={StyleSheet.absoluteFill}
                />
              </View>
            </View>
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
  remaining: {
    paddingLeft: 4,
    color: '#7c7e80'
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
  colorPreview: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  // ..
  // ...
});

export default UserBalances;