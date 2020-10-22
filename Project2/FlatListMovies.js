import React from 'react';
import { 
  FlatList, Text, View, TouchableOpacity,
  StyleSheet, SafeAreaView, Image
} from 'react-native';

Movie = (props) => {
  return (
    <TouchableOpacity 
      onPress={() => {
        props.onSelectMovie(props.movie)
      }}
    >
      <View style={styles.movieContainer}>
        <Text style={styles.movieTitle}>{props.movie.Title}</Text>
        <View style={styles.miscContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.movieDescription}>{props.movie.Year}</Text>
            <Text style={styles.movieDescription}>{props.movie.Type}</Text>
          </View>
          <View style={styles.posterContainer}>
            <Image 
              style={styles.moviePoster} 
              source={{
                uri: props.movie.Poster
              }} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const FlatListMovies = (props) => {
  const renderItem = ({ item }) => (
    <Movie movie={item} onSelectMovie={props.onSelectMovie}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        data={props.movies}
        renderItem={renderItem}
        keyExtractor={item => item.imdbID}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  movieContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  miscContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  descriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieDescription: {
    fontSize: 18,
  },
  posterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  moviePoster: {
    width: 75,
    height: 75,
    borderRadius: 10,
    borderWidth: 1,
  },
});