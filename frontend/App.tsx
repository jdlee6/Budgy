import React, { useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { ModalContext } from './context/ModalContext';
import Home from './pages/Home';

const client = new ApolloClient({
  uri: 'http://192.168.1.158:3000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [expenseModalVisible, setExpenseModalVisible] = useState<boolean>(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [budgetModalVisible, setBudgetModalVisible] = useState<boolean>(false);

  const openExpenseModal = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(false);
    setExpenseModalVisible(true);
  };

  const openCategoryModal = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(true);
    setExpenseModalVisible(false);
  };

  const openBudgetModal = () => {
    setBudgetModalVisible(true);
    setCategoryModalVisible(false);
    setExpenseModalVisible(false);
  };

  const closeModals = () => {
    setBudgetModalVisible(false);
    setCategoryModalVisible(false);
    setExpenseModalVisible(false);
  };

  return (
    <ApolloProvider client={client}>
      <ModalContext.Provider value={{ expenseModalVisible, categoryModalVisible, budgetModalVisible, openExpenseModal, openCategoryModal, openBudgetModal, closeModals }}>
          <View style={styles.container}>
            <Text style={styles.title}>Budgy</Text>
            <Home />
          </View>
      </ModalContext.Provider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
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
    backgroundColor: '#FFFFFF', 
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
});

export default App;