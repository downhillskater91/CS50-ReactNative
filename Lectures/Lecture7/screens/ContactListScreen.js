import React from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SectionListContacts from '../ContactsList';

export default class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
    search: '',
  };

  componentDidMount() {
    this.props.sort();
  }

  toggleContacts = () => {
    this.setState(prevState => ({
      showContacts: !prevState.showContacts,
    }));
  }

  // filter the contacts list as user types
  handleSearchChange = (search) => {
    this.setState({search});
  }

  // creates filtered contacts list based on Search value
  getFilteredContacts = () => {
    return this.props.contacts.filter(contact => 
      contact.name.startsWith(this.state.search)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <>
            <TextInput
              style={styles.search}
              placeholder="Search..."
              onChangeText={this.handleSearchChange}
            />
            <SectionListContacts 
              contacts={this.getFilteredContacts()} 
              onSelectContact={(contact) => {
                this.props.navigation.navigate('ContactDetails', {
                  name: contact.name,
                  phone: contact.phone,
                });
              }}
            />
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
    minWidth: 100,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 18,
  }
});