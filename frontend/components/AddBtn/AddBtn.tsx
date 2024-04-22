import React, { useState, useEffect, useContext } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { ModalContext } from '../../context/ModalContext';

const AddBtn = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { openExpenseModal, openCategoryModal } = useContext(ModalContext)
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: menuVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.01, 1],
  });

  return (
    <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setMenuVisible(!menuVisible)}>
          <Text style={styles.btnText}>+ Add</Text>
        </TouchableOpacity>

        {menuVisible && (
          <Animated.View style={[styles.menu, { opacity: animation, transform: [{ scale }] }]}>
          <TouchableOpacity onPress={(e) => {
            e.stopPropagation();
            openExpenseModal();
            setMenuVisible(false);
          }}>
            <Text style={styles.menuItem}>Expense</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={(e) => {
            e.stopPropagation();
            openCategoryModal();
            setMenuVisible(false);
          }}>
            <Text style={styles.menuItem}>Category</Text>
          </TouchableOpacity>
        </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
    top: 100,
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