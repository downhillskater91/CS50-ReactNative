import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View,
  FlatList, SectionList } from 'react-native';
import Constants from 'expo-constants';

import contacts, {compareNames} from './contacts';
import Row from './Row';
import ContactsList from './ContactsList';
import AddContactForm from './AddContactForm';

export default class App extends React.Component {
  state = {
    showContacts: false,
    showForm: false,
    contacts: contacts,
  };

  componentDidMount() {
    this.sort(); // sort the list before rendering
  }

  // toggles the contacts list
  toggleContacts = () => {
    this.setState(prevState => ({
      showContacts: !prevState.showContacts
    }));
  }

  // toggles the addcontactform
  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }));
  }

  // Takes the contact list and sorts it alphabetically
  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    }));
  }

  render() {
    if(this.state.showForm) return <AddContactForm />
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Toggle Contacts" onPress={this.toggleContacts} />
          <Button title="Add Contact" onPress={this.toggleForm} /> 
        </View>
        {this.state.showContacts && (
          <ContactsList 
            contacts={this.state.contacts}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  buttonContainer: {
    padding: 20,
  },
});