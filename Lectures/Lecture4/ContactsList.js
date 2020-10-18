import React from 'react';
import { SectionList, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Row from './Row';

// function to render the contact items (FlatList and SectionList)
const renderItem = obj => <Row {...obj.item} />;

// function to render each section for SectionList
const renderSectionHeader = obj => (
  <Text style={styles.header}>
    {obj.section.title}
  </Text>
);
const ContactsList = props => {
  // Create object with key firstLetter and value an array of each of
  // the contact objects with that firstLetter as name
  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase()
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    }
  }, {})

  // Sort the contactsByLetter and map them to an object with 
  // title: firstLetter, data: contacts in that letter array
  const sections = Object.keys(contactsByLetter).sort().map(letter => ({
    title: letter,
    data: contactsByLetter[letter],
  }));

  return (
    <SectionList
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      sections={sections}
      /*keyExtractor={(obj) => obj.key.toString()}*/
    />
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactsList;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
})