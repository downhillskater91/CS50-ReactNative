import React from 'react';
import AddContactForm from '../AddContactForm';

export default class AddContactScreen extends React.Component {

  handleSubmit = formState => {
    this.props.addContact(formState);
    this.props.navigation.navigate('ContactList');
  }

  render() {
    return <AddContactForm onSubmit={this.handleSubmit} />;
  }
}