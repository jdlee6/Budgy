import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.footer}>
    <TouchableOpacity onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }]})}>
      <FontAwesomeIcon icon={faHouse} style={{color: "#a2bbf6",}} size={30} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() =>  navigation.reset({ index: 0, routes: [{ name: 'Income' }]})}>
      <FontAwesomeIcon icon={faSackDollar} style={{color: "#a2bbf6",}} size={30} />
    </TouchableOpacity>
  </View>
  )
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e8eef2', // Semi-transparent background
    padding: 10,
    height: 80
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
  },
});