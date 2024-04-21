import React, { useState } from 'react';
import { Button, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from '@apollo/client';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20, // Add a top margin
  },
  // modalContent: {
  //   // flex: 1,
  //   height: '80%',
  //   justifyContent: 'center',
  //   margin: 20,
  //   backgroundColor: '#b8caff',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%', // Make the modal full width
    height: '75%', // Make the modal cover 75% of the screen
    margin: 20,
    backgroundColor: 'white',
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
  // Adjust the text size of the headers
  headerText: {
    fontSize: 16, // Adjust this value as needed
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    height: '88%',
    backgroundColor: 'white',
    padding: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start', // Align the children to the start
    alignItems: 'center', // Center the children horizontally
  },
  text: {
    paddingLeft: 8,
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    padding: 10,
    shadowColor: '#000', // Add shadow color
    shadowOffset: { width: 0, height: 2 }, // Add shadow offset
    shadowOpacity: 0.25, // Add shadow opacity
    shadowRadius: 3.84, // Add shadow radius
    elevation: 5, // Add elevation for Android
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    borderRadius: 35,
    backgroundColor: '#a2bbf6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },

  submitButton: {
    backgroundColor: '#a2bbf6',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'grey',
    position: 'absolute',
    top: 20,
    right: 20,
    width: 30, // Set a fixed width
    height: 30, // Set a fixed height
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    borderRadius: 15, // Half of width and height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const ADD_EXPENSE = gql`
  mutation AddExpense($newExpenseInput: CreateExpenseDto!) {
    createExpense(newExpenseInput: $newExpenseInput) {
      name
      amount
      recurrence
      billingDate
      userId
      categoryId
    }
  }
`

const GET_EXPENSES = gql`
  query {
    expensesByUserId(userId: 1) {
      id
      name
      billingDate
      amount
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
  const [addExpense, { data }] = useMutation(ADD_EXPENSE, { refetchQueries: [{ query: GET_EXPENSES }] });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate.toISOString().split('T')[0]);
  };

  const handleSubmit = () => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const newExpenseInput = { name, amount: parseFloat(amount), billingDate: formattedDate, recurrence: isRecurring, userId: 1, categoryId: 1 };
    console.log('Submitting', newExpenseInput);

    addExpense({
      variables: {
        newExpenseInput: {
          name: name,
          amount: parseFloat(amount),
          recurrence: isRecurring,
          billingDate: date,
          userId: 1, // replace with actual user ID
          categoryId: parseInt(category), // replace with actual category ID
        },
      },
    }
  ) // Pass newExpenseInput as the value of variables
      .then(() => {
        setModalVisible(false);
        // onAddExpense();
      })
      .catch(error => {
        console.error("Error adding expeanse: ", error);
        if (error.graphQLErrors) {
          error.graphQLErrors.map((errorObject) => console.log('GraphQL error object: ', errorObject));
        }
      });
    setModalVisible(false);
    // onAddExpense();
  }

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+ Expense</Text>
      </TouchableOpacity>

      {/* Abstract this */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    // Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
  }}
>
        {/* <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}> */}
      
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
          <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Amount" />
          
          {/* Todo: needs to open a calendar component or date selector */}
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              mode={'date'}
              is24Hour={true}
              display="default"
              value={new Date(date)} // Convert the `date` string to a `Date` object
              onChange={onChange}
            />
          )}
          <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
          
          {/* Todo: needs to be a dropdown */}
          <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Category" />
          {/* Todo: Find a checkbox */}
          {/* <View style={styles.checkboxContainer}>
            <CheckBox value={isRecurring} onValueChange={setIsRecurring} tintColors={{ true: '#00f', false: '#000' }} />
            <Text style={styles.text}>Recurring</Text>
          </View> */}

          <TouchableOpacity style={styles.submitButton} onPress={() => {
            handleSubmit();
            setModalVisible(false);
          }}>
            <Text style={styles.submitButtonText}>+ Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelButtonText}>X</Text>
          </TouchableOpacity>
          </View>
          </View>
        {/* </SafeAreaView> */}

      </Modal>
    </View>
  );
};

export default AddExpenseButton;