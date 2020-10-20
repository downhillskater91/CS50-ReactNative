import React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal',
        }}>
        <Button 
          title="Go to screen two" 
          onPress={() => {
            this.props.navigation.navigate('ScreenTwo');
          }}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange',
        }}>
        <Button 
          title="Go to screen one" 
          onPress={() => {
            this.props.navigation.navigate('ScreenOne');
          }}
        />
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="ScreenOne"
          component={ScreenComponentOne}
        />
        <Stack.Screen
          name="ScreenTwo"
          component={ScreenComponentTwo}
        ></Stack.Screen>
      </Stack.Navigator>
    );
  }
}