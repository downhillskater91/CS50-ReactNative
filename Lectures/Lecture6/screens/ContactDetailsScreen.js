import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default class ContactDetailsScreen extends React.Component {
  state = {
    contact: {
      name: this.props.route.params.name,
      phone: this.props.route.params.phone,
    },
  };

  _goToRandom = () => {
    const contacts = this.props.contacts;
    const phone = this.state.contact.phone;
    let randomContact;
    while(!randomContact) {
      const randomIndex = Math.floor(Math.random() * contacts.length);
      if(contacts[randomIndex].phone !== phone) {
        randomContact = contacts[randomIndex];
      }
    }
    
    this.props.navigation.push('ContactDetails', {
      name: randomContact.name,
      phone: randomContact.phone,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.phoneText}>
          Phone: {this.state.contact.phone}
        </Text>
        <Button 
          title="Go to random contact"
          onPress={this._goToRandom}
          color='maroon'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  phoneText: {
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 5,
    borderColor: 'maroon',
    borderRadius: 20,
  },
});