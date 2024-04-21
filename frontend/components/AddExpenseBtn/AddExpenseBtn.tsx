import React, { useState } from 'react';
import { Button, Modal, View, Text, TextInput, StyleSheet } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    flex: 0.6,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: '#daecff8e',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    paddingLeft: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10, 
    backgroundColor: '#f8f8f8', 
    padding: 10, 
  },

  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  dateIcon: {
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInput: {
    marginLeft: 36,
    borderRadius: 5,
    borderColor: '#ccc',
    height: 40,
    justifyContent: 'center',
  },
  dateText: {
    color: '#333',
  },
});

const ADD_EXPENSE = gql`
  mutation AddExpense($newExpenseInput: NewExpenseInput!) {
    createExpense(newExpenseInput: $newExpenseInput) {
      name
      amount
      recurrence
      userId
      categoryId
    }
  }
`

const AddExpenseButton = ({ onAddExpense }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [addExpense, { data }] = useMutation(ADD_EXPENSE);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate.toISOString().split('T')[0]);
  };

  const handleSubmit = () => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const newExpenseInput = { name, amount: parseFloat(amount), billingDate: formattedDate, recurrence: isRecurring, userId: 1, categoryId: parseInt(category) };
    console.log('Submitting', newExpenseInput);
  
    addExpense({ variables: { ...newExpenseInput } })
      .then(() => {
        setModalVisible(false);
        // onAddExpense();
      })
      .catch(error => {
        console.error("Error adding expense: ", error);
        if (error.graphQLErrors) {
          error.graphQLErrors.map(({ message }) => console.log('GraphQL error: ', message));
        }
      });
    setModalVisible(false);
    // onAddExpense();
  }

  return (
    <View>
      <Button title="Add Expense" onPress={() => {setModalVisible(true), onAddExpense}} />
      <Modal style={styles.modalContent} visible={modalVisible} animationType="fade" transparent={false}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
          <Text style={styles.text}>Amount:</Text>
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
          
          {/* Todo: needs to open a calendar component or date selector */}
          {showDatePicker && (
            <DateTimePicker
              value={new Date(date)}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
          
          {/* Todo: needs to be a dropdown */}
          <Text style={styles.text}>Category:</Text>
          <TextInput style={styles.input} value={category} onChangeText={setCategory} />
          {/* Todo: Find a checkbox */}
          {/* <View style={styles.checkboxContainer}>
            <CheckBox value={isRecurring} onValueChange={setIsRecurring} tintColors={{ true: '#00f', false: '#000' }} />
            <Text style={styles.text}>Recurring</Text>
          </View> */}

          <Button title="Submit" onPress={() => {
            handleSubmit();
            setModalVisible(false);
          }} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
        </SafeAreaView>

      </Modal>
    </View>
  );
};

export default AddExpenseButton;