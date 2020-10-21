import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddContactScreen from './screens/AddContactScreen';
import ContactListScreen from './screens/ContactListScreen';
import ContactDetailsScreen from './screens/ContactDetailsScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { fetchContacts } from './api';
import { compareNames } from './contacts';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ContactNavigator = (props) => (
  <Stack.Navigator initialRouteName="ContactList">
    <Stack.Screen
      name="ContactList"
      options={({navigation}) => ({
        title: "Contacts",
        headerStyle: {
          backgroundColor: 'maroon',
        },
        headerTintColor: 'white',
        headerRight: () => (
          <Button
            title="Add"
            onPress={() => {navigation.navigate("AddContact")}}
            color='white' 
          />
        ),
        headerLeft: () => (
          <Button
            title="Logout"
            onPress={props.toggleLogin}
            color='white'
          />
        ),
      })}
    >
      {(obj) => 
        <ContactListScreen
          {...obj}
          contacts={props.contacts}
          sort={props.sort}
        />
      }
    </Stack.Screen>
    <Stack.Screen
      name="AddContact"
      options={{
        title: "Add Contact",
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'maroon',
        },
      }}
    >
      {(obj) => 
        <AddContactScreen
          {...obj}
          addContact={props.addContact}
          sort={props.sort}
        />
      }
    </Stack.Screen>
    <Stack.Screen
      name="ContactDetails"
      options={({route}) => ({
        title: route.params.name,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'maroon',
        },
      })}
    >
      {(obj) => <ContactDetailsScreen {...obj} contacts={props.contacts} />}
    </Stack.Screen>
  </Stack.Navigator>
);

const TabNavigator = props => (
  props.isLoggedIn ? (
    <>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'maroon',
        }}
      >
        <Tab.Screen 
          name="Contacts"
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={`ios-contacts`}
                size={25}
                color={color}
              />
            )
          })}
        >
          {(obj) => <ContactNavigator
            {...obj}
            contacts={props.contacts}
            addContact={props.addContact}
            isLoggedIn={props.isLoggedIn}
            toggleLogin={props.toggleLogin}
            sort={props.sort}
          />}
        </Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={() => ({
            tabBarIcon: ({ color }) => (
              <Ionicons
                name={`ios-settings`}
                size={25}
                color={color}
              />
            )
          })}
        />
      </Tab.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={() => ({
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'maroon',
            }
          })}
        >
          {(obj) => <LoginScreen
            {...obj}
            toggleLogin={props.toggleLogin}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </>
  )
);

export default class App extends React.Component {
  state = {
    contacts: null,
    isLoggedIn: false,
  };

  // call the API to get the contacts from randomuser.me
  componentDidMount() {
    this.getContacts();
  }
  
  getContacts = async () => {
    const results = await fetchContacts();
    this.setState({
      contacts: results
    });
  }

  // Takes the contact list and sorts it alphabetically
  sort = () => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts].sort(compareNames),
    }));
  }

  addContact = newContact => {
    // update the contacts and hide form
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    this.sort();
  }

  toggleLogin = () => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
    }));
  }

  render() {
    return (
      <NavigationContainer>
        <TabNavigator 
          isLoggedIn={this.state.isLoggedIn}
          contacts={this.state.contacts}
          addContact={this.addContact}
          sort={this.sort}
          toggleLogin={this.toggleLogin}
        />
      </NavigationContainer>
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