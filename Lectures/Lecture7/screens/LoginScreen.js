import React from 'react';
import { Button, KeyboardAvoidingView, StyleSheet, TextInput,
 Text } from 'react-native';
 import {login} from '../api';

export default class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    err: '',
  };

  _login = async () => {
    try {
      const success = await login(this.state.username, this.state.password);
      this.props.toggleLogin();
    } catch(err) {
      const errMessage = err.message;
      this.setState({
        err: errMessage,
      });
    }
  }

  handleUsernameUpdate = (username) => {
    this.setState({username});
  }

  handlePasswordUpdate = (password) => {
    this.setState({password});
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
      >
        <Text style={styles.error}>{this.state.err}</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={this.state.username}
          onChangeText={this.handleUsernameUpdate}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={this.state.password}
          onChangeText={this.handlePasswordUpdate}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button 
          title="Press to Login"
          onPress={this._login}
          color='maroon'
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontSize: 18,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 18,
  },
});