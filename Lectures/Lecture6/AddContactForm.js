import React from 'react';
import { StyleSheet, TextInput, View, Button,
  Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

export default class AddContactForm extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if(this.state.name !== prevState.name || this.state.phone !== prevState.phone) {
      this.validateForm();
    }
  }

  /*
  getHandler = key => val => {
    this.setState({[key]: val})
  }
  */

  //handleNameChange = this.getHandler("name"); // val => {this.setState({name: val})}
  //handlePhoneChange = this.getHandler("phone");

  handleNameChange = name => {
    // validateForm is called after setState
    this.setState({name});
  }

  handlePhoneChange = phone => {
    // Make sure the number is valid
    // (validateForm is called after setState)
    if(+phone >= 0 && phone.length <= 10) {
      this.setState({phone});
    }
  }

  validateForm = () => {
    const names = this.state.name.split(" ");

    if(+this.state.phone >= 0 &&
      this.state.phone.length === 10 && 
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
          value={this.state.phone} 
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
    marginTop: 20,
    minWidth: 100,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 3,
  },
});