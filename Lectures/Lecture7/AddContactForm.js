import React from 'react';
import { StyleSheet, TextInput, View, Button,
  Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    typedPhone: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm();
    }
  }

  handleNameChange = name => {
    // validateForm is called after setState
    this.setState({name});
  }

  handlePhoneChange = typedPhone => {
    // Make sure the number is valid
    // (validateForm is called after setState)
    if(+typedPhone >= 0 && typedPhone.length <= 10) {
      if(typedPhone.length == 10) {
        this.setState({
          typedPhone,
          phone: `(${typedPhone.slice(0,3)})-${typedPhone.slice(3,6)}-${typedPhone.slice(6)}`
        });
      } else {
        this.setState({typedPhone});
      }
    }
  }

  validateForm = () => {
    const names = this.state.name.split(" ");

    if(+this.state.typedPhone >= 0 &&
      this.state.typedPhone.length === 10 && 
      this.state.name.length >= 3 &&
      names.length >= 2 && names[0] && names[1]) {
        return this.setState({isFormValid: true});
    } else {
      return this.setState({isFormValid: false});
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={styles.container}
      >
        <TextInput 
          style={styles.input} 
          value={this.state.name} 
          onChangeText={this.handleNameChange}
          placeholder="Name"
        />
        <TextInput 
          style={styles.input}
          value={this.state.typedPhone}
          onChangeText={this.handlePhoneChange}
          keyboardType={"numeric"}
          placeholder="Phone"
        />
        <Button 
          title="Submit" 
          onPress={this.handleSubmit} 
          disabled={!this.state.isFormValid}
          color='maroon'
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 25,
    justifyContent: 'center',
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 10,
    minWidth: 100,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});