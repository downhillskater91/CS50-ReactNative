import React from 'react';
import { Button, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

class ScreenComponentOne extends React.Component {
  render() {
    return (
      <View 
        style={{
          flex: 1,
          alignItems: 'center', 
          justifyContent: 'center', 
          borderWidth: 25, 
          borderColor: 'teal'
        }}>
        <Button title="Go to screen two" />
      </View>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  "RouteName1": /* */
});

export default class App extends React.Component {
  render() {
    // return...
  }
}