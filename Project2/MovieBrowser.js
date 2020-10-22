import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SettingsScreen from './screens/SettingsScreen';
import BrowserScreen from './screens/BrowserScreen';
import DetailsScreen from './screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackStructure = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'tomato',
        },
      }}
    >
      <Stack.Screen 
        name="Movie Browser" 
        component={BrowserScreen} 
      />
      <Stack.Screen name="Movie Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const TabStructure = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === "Movies") {
            iconName = 'ios-videocam'
          } else if(route.name === "Settings") {
            iconName = focused ? 'ios-list-box': 'ios-list';
          }

          return <Ionicons name={iconName} size={30} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        }
      }}
    >
      <Tab.Screen name="Movies" component={StackStructure} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default class MovieBrowser extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabStructure />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});