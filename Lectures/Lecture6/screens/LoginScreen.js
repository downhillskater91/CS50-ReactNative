import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';

export default class LoginScreen extends React.Component {

  _login = () => {
    // Set isLoggedIn to true
    this.props.toggleLogin();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You are currently logged out.</Text>
        <Button 
          title="Press to Login"
          onPress={this._login}
          color='maroon'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});