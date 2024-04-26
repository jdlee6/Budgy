import React, { useState, useEffect, useContext } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ModalContextInterface, ModalContext } from '../../context/ModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddBtn = ({ menuVisible, setMenuVisible }) => {
  const { openExpenseModal, openCategoryModal, openBudgetModal } = useContext<ModalContextInterface>(ModalContext)
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: menuVisible ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.01, 1],
  });

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          {/* <Text style={styles.btnText}></Text> */}
          <FontAwesomeIcon icon={faPlusCircle}  style={{color: "#a2bbf6",}} size={30} />
        </TouchableOpacity>

        {/* Todo: add icons next to these */}
        {menuVisible && (
          <Animated.View style={[styles.menu, { opacity: animation, transform: [{ scale }] }]}>
            <TouchableOpacity onPress={(e) => {
              e.stopPropagation();
              openCategoryModal();
              setMenuVisible(false);
            }}>
              <Text style={styles.menuItem}>Category</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={(e) => {
              e.stopPropagation();
              openBudgetModal();
              setMenuVisible(false);
            }}>
              <Text style={styles.menuItem}>Budget</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={(e) => {
              e.stopPropagation();
              openExpenseModal();
              setMenuVisible(false);
            }}>
              <Text style={styles.menuItem}>Expense</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
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
  btnText: {
    color: 'white'
  },
  menu: {
    position: 'absolute',
    bottom: '180%',
    backgroundColor: '#a2bbf6',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  menuItem: {
    padding: 10,
    color: 'white',
  },
});

export default AddBtn;