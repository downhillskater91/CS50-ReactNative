const api_key = "a239ec2f";

// async method to get the movie titles
export const fetchMovies = async (search, page) => {
  const response = await fetch(`http://omdbapi.com/?apikey=${api_key}&s=${search}&page=${page}`);
  const results = await response.json();

  if(results.Response === "True") {
    return results;
  }

  const errMessage = results.Error;
  throw new Error(errMessage);
}

export const fetchMovieDetails = async (title) => {
  const response = await fetch(`http://omdbapi.com/?apikey=${api_key}&t=${title}`);
  const result = await response.json();

  if(result.Response === "True") {
    return result;
  }

  const errMessage = result.Error;
  throw new Error(errMessage);
}