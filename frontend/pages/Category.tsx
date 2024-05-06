import React from 'react';
import { View, Text } from 'react-native';
import Footer from '../components/shared/Footer/Footer';

const Category = ({ route }) => {
  // LOG  {"amount": 500, "categoryColor": "#96fff4", "categoryName": "Vehicle", "remainingBudgetBalance": 500}
const { amount, categoryColor, categoryName, remainingBudgetBalance } = route.params.budget;

console.log(amount, categoryColor, categoryName, remainingBudgetBalance);
return (
    <>
     <View>
     <Text>hi - Category page</Text>
     <Text>hi - Category page</Text>
     <Text>hi - Category page</Text>
     <Text>{amount} {categoryName} {remainingBudgetBalance}</Text>

     </View>
     <Footer />
    </>
  );
};

export default Category;