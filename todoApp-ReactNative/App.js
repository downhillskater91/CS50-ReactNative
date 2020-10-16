import React from "react";
import {View, Button, Text, ScrollView, StyleSheet,
  Switch} from 'react-native';
import Constants from 'expo-constants';

// Global ID counter for Todo items
let id = 0;

// StyleSheets for Components
const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: Constants.statusBarHeight,
  },
  fill: {
    flex: 1,
  }
});

// The Todo item that gets added
const Todo = (props) => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.onToggle} />
    <Button onPress={props.onDelete} title="delete"/>
    <Text>{props.todo.text}</Text>
  </View>
);

// The actual App
export default class App extends React.Component {
  constructor() {
    super(); // always call super
    this.state = {
      todos: []
    };
  }

  // function called when Todo needs to be added
  addTodo() {
    id++; // increment the global ID
    const text = `TODO number ${id}`;
    this.setState({
      todos: [...this.state.todos, { id: id, text: text, checked: false }]
    });
  }

  // function called to remove a Todo based on ID
  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }

  render() {
    return (
      <View style={[styles.appContainer, styles.fill]}>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>
          Unchecked todo count:{" "}
          {this.state.todos.filter((todo) => !todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="Add TODO" />
        <ScrollView style={styles.fill}>
          {this.state.todos.map((todo) => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}