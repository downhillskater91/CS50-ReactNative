import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme,
  DarkTheme 
} from '@react-navigation/native';

import MovieBrowser from './MovieBrowser';

export default function App() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <MovieBrowser />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
