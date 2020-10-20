import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import SectionListContacts from '../ContactsList';

export default class ContactListScreen extends React.Component {
  state = {
    showContacts: true,
  };

  componentDidMount() {
    this.props.sort();
  }

  toggleContacts = () => {
    this.setState(prevState => ({
      showContacts: !prevState.showContacts,
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showContacts && (
          <SectionListContacts 
            contacts={this.props.contacts} 
            onSelectContact={(contact) => {
              this.props.navigation.navigate('ContactDetails', {
                name: contact.name,
                phone: contact.phone,
              });
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});