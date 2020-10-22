import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Settings</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>This is the Settings Screen</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 2.03,
    backgroundColor: 'tomato',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  body: {
    flex: 16,
    justifyContent: 'center',
    //backgroundColor: '#feede9',
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 18,
    textAlign: 'center',
  },
})