import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';

import { fetchMovieDetails } from '../api';

export default class DetailsScreen extends React.Component {
  state = {
    details: null,
    err: '',
  };

  componentDidMount() {
    this.getMovieDetails(this.props.route.params.movie.Title);
  }

  getMovieDetails = async (title) => {
    try {
      const details = await fetchMovieDetails(title);
      //console.log(details);
      this.setState({ 
        details,
        err: '',
      });
    } catch(err) {
      this.setState({
        err: err.message,
      });
    }
  }

  render() {
    if(!this.state.details) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      );
    } else if(this.state.err) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{this.state.error}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{this.state.details.Title}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              style={styles.poster} 
              source={{
                uri: this.state.details.Poster
              }}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.descriptionContainer}>
              <Text>
                <Text style={styles.descHeader}>Year: </Text>
                <Text style={styles.bodyText}>{this.state.details.Year}</Text>
              </Text>
              <Text>
                <Text style={styles.descHeader}>Rated: </Text>
                <Text style={styles.bodyText}>{this.state.details.Rated}</Text>
              </Text>
              <Text>
                <Text style={styles.descHeader}>Writer(s): </Text>
                <Text style={styles.bodyText}>{this.state.details.Writer}</Text>
              </Text>
              <Text>
                <Text style={styles.descHeader}>Actors: </Text>
                <Text style={styles.bodyText}>{this.state.details.Actors}</Text>
              </Text>
              <Text>
                <Text style={styles.descHeader}>Plot: </Text>
                <Text style={styles.bodyText}>{this.state.details.Plot}</Text>
              </Text>
              <Text>
                <Text style={styles.descHeader}>IMDb Rating: </Text>
                <Text style={styles.bodyText}>{this.state.details.imdbRating}</Text>
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loading: {
    textAlign: 'center',
    color: 'black',
    fontSize: 48,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 48,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '500',
    color: 'black',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  poster: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  scrollContainer: {
    marginTop: 100,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  descHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bodyText: {
    fontSize: 16,
    color: 'black',
  },
});