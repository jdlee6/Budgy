import React, { useContext, useEffect, useState, useMemo } from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import { FinancialDataContext } from '../../context/FinancialDataContext';
import * as Progress from 'react-native-progress';

const UserBalances = () => {
  const { expenses, budgets, user, balances } = useContext(FinancialDataContext);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (expenses || budgets) {
      setLoading(false)
    }
  }, [expenses, budgets, balances])

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const balanceAfterExpenses = (user.totalIncome - totalExpenses).toFixed(2);
  const date = new Date(Date.now())
  const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // useMemo makes it memoize so it only runs once on first render and whenever the dependencies change
  const expensesByCategory = useMemo(() => expenses.reduce((acc, expense) => {
    if (expense.category) {
      acc[expense.category.name] = (acc[expense.category.name] || 0) + expense.amount;
    }
    return acc;
  }, {}), [expenses]);
  const formattedBudgets = useMemo(() => {
    return budgets.map(budget => ({ amount: budget.amount, categoryName: budget.category.name, categoryColor: budget.category.color }));
  }, [budgets]);
  const budgetsAfterExpenses = useMemo(() => formattedBudgets?.map(budget => {
    if (budget) {
      const totalExpenseForCategory = expensesByCategory[budget.categoryName] || 0;
      return { ...budget, remainingBudgetBalance: budget.amount - totalExpenseForCategory };
    }
    return null;
  }).filter(Boolean), [expenses, budgets, balances]);

  const [progresses, setProgresses] = useState(budgetsAfterExpenses.map(() => new Animated.Value(0)));

  useEffect(() => {
    const listeners = progresses.map(progress => progress.addListener(() => setProgresses([...progresses])));

    Animated.stagger(200, budgetsAfterExpenses.map((budget, index) => {
      const finalProgress = budget.remainingBudgetBalance / budget.amount;
      return Animated.timing(progresses[index], {
        toValue: finalProgress,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }));

    return () => {
      progresses.forEach((progress, index) => progress.removeListener(listeners[index]));
    }
  }, [budgetsAfterExpenses]);

  if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error :(</Text>;

  return (
    <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.income}>Monthly Income: ${user.totalIncome}</Text>
      <Text style={styles.income}>{formattedDate}</Text>
    </View>
    <Text style={styles.income}>Remaining Balance: ${balanceAfterExpenses}</Text>

    {budgetsAfterExpenses.map((budget, index) => {
      const animatedProgress = progresses[index];
      const percentage = Math.round(animatedProgress.__getValue() * 100);
      const percentageDigits = percentage.toString().length;

      const calculateLeftPosition = (percentageDigits: number) => {
        switch (percentageDigits) {
          case 1: 
            return '90%';
          case 2:
            return '82%';
          default:
            return '77%';
        }
      }

      return (
        <View key={index} style={{ marginLeft: 16, marginTop: 24, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{ position: 'relative'}}>
          <Progress.Circle
            progress={animatedProgress.__getValue() || 0}
            size={100}
            color={budget.categoryColor || '#a1e8a0'}
            thickness={4} 
            animated={true}
          >
            <Text style={{ 
              position: 'absolute', 
              top: '90%', 
              left: calculateLeftPosition(percentageDigits), 
              transform: [{ translateX: -50 }, { translateY: -50 }], 
              fontSize: 16 
            }}>
              {`${percentage}%`}
            </Text>
          </Progress.Circle>
        </View>
        
        <View style={{ margin: 32 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <View style={[styles.colorPreview, { backgroundColor: budget.categoryColor || 'white', marginLeft: 16 }]} />
            <Text style={styles.remaining}>{budget.categoryName}</Text>
          </View>
          <Text style={styles.income}>Balance: ${parseFloat(budget.remainingBudgetBalance).toFixed(2)} / ${budget.amount}</Text>
        </View>

          {/* <View style={{width: 140, height: 12, margin: 16, borderRadius: 10, overflow: 'hidden', backgroundColor: '#e4e4e4'}}>
            <View style={{width: progress * 140, height: 20}}>
              <LinearGradient colors={['#a1e8a0', '#d4e3cf']} 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}} 
                style={StyleSheet.absoluteFill}
              />
            </View>
          </View> */}
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
    marginTop: 8,
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
});

export default UserBalances;