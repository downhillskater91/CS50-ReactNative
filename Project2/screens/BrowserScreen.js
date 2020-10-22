import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Button, 
          Text, TextInput, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { fetchMovies } from '../api';
import { FlatListMovies } from '../FlatListMovies';

export default class BrowserScreen extends React.Component {
  state = {
    movies: [],
    search: '',
    err: '',
    totalResults: 0,
    currentPage: 1,
  };

  getMovies = async () => {
    try {
      const movies = await fetchMovies(this.state.search, 1);
      this.setState({ 
        movies: movies.Search,
        totalResults: movies.totalResults,
        currentPage: 1,
        err: '',
      });
    } catch(err) {
      this.setState({
        err: err.message,
      });
    }
  }

  getPreviousPage = async () => {
    try {
      const movies = await fetchMovies(this.state.search, this.state.currentPage - 1);
      this.setState({
        movies: movies.Search,
        totalResults: movies.totalResults,
        currentPage: this.state.currentPage - 1,
        err: '',
      });
    } catch(err) {
      this.setState({
        err: err.message,
      });
    }
  }

  getNextPage = async () => {
    try {
      const movies = await fetchMovies(this.state.search, this.state.currentPage + 1);
      this.setState({
        movies: movies.Search,
        totalResults: movies.totalResults,
        currentPage: this.state.currentPage + 1,
        err: '',
      });
    } catch(err) {
      this.setState({
        err: err.message,
      });
    }
  }

  goToDetails = (movie) => {
    this.props.navigation.navigate("Movie Details", {movie});
  }

  handleSearchChange = (search) => {
    this.setState({ search });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.err}</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Search for a movie..."
            onChangeText={this.handleSearchChange}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={this.getMovies}>
            <Ionicon name="ios-search" size={50} />
          </TouchableOpacity>
        </View>
        <FlatListMovies 
          movies={this.state.movies} 
          onSelectMovie={(movie) => this.goToDetails(movie)}
        />
        <View style={styles.pageNavBar}>
          {this.state.currentPage !== 1 ?
            <TouchableOpacity style={styles.pageNavButtons} onPress={this.getPreviousPage}>
              <Ionicon name="ios-arrow-round-back" size={50}/>
            </TouchableOpacity>
            :
            <View style={{marginLeft: 25, }} />
          }
          <View style={styles.pageNavTextContainer}>
            <Text style={styles.pageNavText}>{this.state.currentPage} / {Math.floor(this.state.totalResults/10) + 1}</Text>
          </View>
          {(this.state.currentPage !== Math.floor(this.state.totalResults/10) + 1) ?
            <TouchableOpacity style={styles.pageNavButtons} onPress={this.getNextPage}>
              <Ionicon name="ios-arrow-round-forward" size={50} />
            </TouchableOpacity>
            :
            <View style={{marginRight: 25,}} />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  searchIcon: {
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
  headerText: {
    fontSize: 32,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fffdfc',
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 10,
    paddingLeft: 10,
  },
  pageNavBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    marginBottom: 15,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  pageNavTextContainer: {
    justifyContent: 'center',
  },
  pageNavButtons: {
    borderRadius: 10,
  },
  pageNavText: {
    fontSize: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});