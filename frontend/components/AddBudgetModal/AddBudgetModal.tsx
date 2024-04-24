import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ModalContext, ModalContextInterface } from '../../context/ModalContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { FinancialDataContext } from '../../context/FinancialDataContext';


const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20, // Add a top margin
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  modalContent: {
    height: '90%',
    backgroundColor: 'white',
    padding: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-start', // Align the children to the start
    alignItems: 'center', // Center the children horizontally
  },
  title: {
    color: '#a2bbf6',
    fontSize: 18,
    padding: 16,
    backgroundColor: '#FFFFFF', // Set the background color to white
  },
  text: {
    color: '#aaa',
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
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
    top: 260,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
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
  submitButtonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#c7d3dd',
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
    fontSize: 12,
  },
  colorPickerContainer: {
    width: 300,
    height: 300,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 8,
  },
});


const AddBudgetModal = () => {
  const { budgetModalVisible, closeModals } = useContext<ModalContextInterface>(ModalContext);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const { addBudget, categories } = useContext(FinancialDataContext);

  const handleSubmit = () => {
    const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
    
    if (selectedCategoryObj) {
      addBudget({
        variables: {
          newBudgetInput: {
            amount: parseFloat(amount),
            userId: 1,
            categoryId: parseFloat(selectedCategoryObj.id),
          },
        },
      }) 
        .then(() => {
          closeModals();
        })
        .catch(error => {
          console.error("Error adding expeanse: ", error);
        });
    }
    closeModals();
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={budgetModalVisible}
        onRequestClose={() => {
          closeModals();
        }}
      >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.title}>Add Budget</Text>
            <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Amount" />
            <DropDownPicker
                open={open}
                items={categories.map((category, index) => ({ label: category.name, value: category.name, key: index }))}
                value={selectedCategory}
                setValue={setSelectedCategory}
                containerStyle={{
                  height: 40,
                  marginTop: 10,
                  marginBottom: 10,
                  width: '100%',
                }}
                style={{
                  borderWidth: 0,
                  height: 40,
                  marginTop: 10,
                  marginBottom: 10,
                  width: '100%',
                  paddingHorizontal: 10,
                  backgroundColor: '#f8f8f8',
                  padding: 10,
                  shadowColor: '#000', // Add shadow color
                  shadowOffset: { width: 0, height: 2 }, // Add shadow offset
                  shadowOpacity: 0.25, // Add shadow opacity
                  shadowRadius: 3.84, // Add shadow radius
                  elevation: 5, // Add elevation for Android
                }}
                dropDownContainerStyle={{
                  borderWidth: 0,
                  width: '100%',
                  backgroundColor: '#f8f8f8',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  borderRadius: 10, // Add this line to make the corners rounded
                }}
                labelStyle={{
                  color: '#aaa',
                }}
                textStyle={{
                  color: '#aaa'
                }}
                setOpen={setOpen}
                setItems={setOptions}
                placeholder='Category'
            />
            <TouchableOpacity style={styles.submitButton} onPress={() => {
              handleSubmit();
              closeModals();
            }}>
              <Text style={styles.submitButtonText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => closeModals()}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          </View>
      </Modal>
    </View>
  );
};

export default AddBudgetModal;