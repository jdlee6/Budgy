import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import Income from '../pages/Income';
import Category from '../pages/Category';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' }
    }}
    >
      <Stack.Screen name='Home' component={Home} options ={{
          animationEnabled: false,
          // headerShown: false,
        }} />
      <Stack.Screen name='Income' component={Income} options={{
          animationEnabled: false,
          headerShown: false,
        }} />
        <Stack.Screen name='Category' component={Category} options={{
          // animationEnabled: false,
          headerShown: false,
        }} />
    </Stack.Navigator>
  )
}

export default AppNavigator;