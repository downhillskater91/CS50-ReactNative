import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  input: {
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});

export default class AddContactForm extends React.Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: '',
    phone: '',
  };

  handleNameChange = name => {
    this.setState({name});
  }

  handlePhoneChange = phone => {
    this.setState({phone});
  }

  render() {
    return (
      <View style={{paddingTop: Constants.statusBarHeight}}>
        <TextInput 
          style={styles.input} 
          value={this.state.name} 
          onChangeText={this.handleNameChange}
        />
        <TextInput 
          style={styles.input} 
          value={this.state.phone} 
          onChangeText={this.handlePhoneChange}
          keyboardType={"numeric"}
        />
        <Button title="Add Contact" />
      </View>
    );
  }
}