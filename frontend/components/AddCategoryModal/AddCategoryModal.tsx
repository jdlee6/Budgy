import React, { useState, useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ModalContext } from '../../context/ModalContext';
import ColorPicker from 'react-native-wheel-color-picker'

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
    marginTop: 40,
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


const ADD_CATEGORY = gql`
  mutation AddCategory($newCategoryInput: CreateCategoryDto!) {
    createCategory(newCategoryInput: $newCategoryInput) {
      id,
      name,
      color,
      expenses { id, name },
      userId
    }
  }
`

const GET_EXPENSES_AND_CATEGORIES_BY_USER_ID = gql`
query GetExpensesAndCategoriesByUserId($userId: Float!) {
  expensesByUserId(userId: $userId) {
    id
    name
    billingDate
    amount
    categoryId
    category { 
      name
    }
  }
  categoriesByUserId(userId: $userId) {
    id
    name
  }
}
`;

const AddCategoryModal = () => {
  const { categoryModalVisible, closeModals } = useContext(ModalContext);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#969696'); // Add a color state
  const [categories, setCategories] = useState<string[]>([]);
  const [isPickerActive, setIsPickerActive] = useState(true);

  const [addCategory, { data: addCategoryData }] = useMutation(ADD_CATEGORY, { refetchQueries: [{ query: GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, variables: {userId: 1} }] });
  const { loading, error, data } = useQuery(GET_EXPENSES_AND_CATEGORIES_BY_USER_ID, {
    variables: { userId: 1 },
  });
  
  React.useEffect(() => {
    if (data) {
      const uniqueCategories = Array.from(new Set(data.categoriesByUserId.map((category: { name: string }) => category.name)));
      console.log(uniqueCategories);
      setCategories(uniqueCategories);
    }
  }, [data, loading])

  const handleSubmit = () => {
    const newCategoryInput = { name, color, userId: 1};
    console.log('Submitting', newCategoryInput);
    addCategory({
      variables: {
        newCategoryInput: {
          name: name,
          color: color,
          userId: 1, // replace with actual user ID
        },
      },
    }) 
      .then(() => {
        closeModals();
      })
      .catch(error => {
        console.error("Error adding expeanse: ", error);
      });
    closeModals();
  }

  React.useEffect(() => {console.log(color);}, [color])

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={categoryModalVisible}
        onRequestClose={() => {
          closeModals();
        }}
      >
        {/* Todo: Fix this?? */}
        {/* <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          onScrollEndDrag={(event) => {
            if (event.nativeEvent.contentOffset.y < 0) {
              closeModals();
            }
          }}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="always"
        > */}
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.title}>Add Category</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
            
            <Text style={{ color: '#aaa', marginTop: 8 }}>
              Category color:{' '}
              <Text style={{ color: color }}>
                {color}
              </Text>
            </Text>
            <View style={{...styles.colorPreview, backgroundColor: color}} />
            <View style={styles.colorPickerContainer}>
              <ColorPicker
                color={color}
                onColorChange={setColor}
                swatches={false}
                // sliderHidden={true}
                thumbSize={40}
                // noSnap={true}
                // row={true}
                useNativeDriver={true}
                useNativeLayout={true}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={() => {
              handleSubmit();
              closeModals();
            }}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => closeModals()}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          </View>
        {/* </ScrollView> */}
      </Modal>
    </View>
  );
};

export default AddCategoryModal;