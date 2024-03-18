import '@tamagui/core/reset.css';
import { TamaguiProvider, View, Text } from '@tamagui/core';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <TamaguiProvider>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </TamaguiProvider>
  );
}