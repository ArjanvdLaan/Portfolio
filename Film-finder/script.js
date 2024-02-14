const tmdbKey = "0e6d369627e7fc4ce789d447b9c3e161";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list?language=en";
  const requestParams = `&api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);
      const genres = jsonResponse.genres;
      // console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log("There is an " + error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = `/discover/movie`;
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  // Generate a random number of pages to fetch between 10 and 50
  const pagesToFetch = Math.floor(Math.random() * 41) + 10;
  let movies = [];

  // Loop over the number of pages to fetch the specified amount
  for (let i = 1; i <= pagesToFetch; i++) {
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}&page=${i}`;

    try {
      const response = await fetch(urlToFetch);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      movies = movies.concat(data.results);
    } catch (error) {
      console.error(`Could not fetch movies, error: ${error}`);
    }
  }

  return movies;
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

let currentMovie = [];

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  console.log(movies);
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  // console.log(info);
  currentMovie.push(info);
  console.log( `Current Movie: ${currentMovie[0].title}`);
  if (moviePoster.childNodes.length == 0) {
    displayMovie(info);
  }
  console.log(`Info: ${info.title}`);
  // return info;
};



const displayLikedMovie = async (movieInfo) => {
  const movieList = document.getElementById("listLikedMovies");
  const li = document.createElement("li");
  const h3 = document.createElement("h3");
  const a = document.createElement("a");
  const img = document.createElement("img");

  // const movieInfo = await showRandomMovie();
  // console.log(`movieInfo: ${movieInfo}`);

  h3.setAttribute("id", "likedMovieTitle");
  h3.innerHTML = movieInfo.title;

  a.setAttribute("target", "_blank");
  a.setAttribute("href", `http://www.imdb.com/title/${movieInfo.imdb_id}/`);

  img.setAttribute("id", "likedMoviePoster");
  img.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`
  );

  movieList.appendChild(li).appendChild(a).appendChild(img);
  li.appendChild(h3);
};

getGenres().then(populateGenreDropdown);

playBtn.onclick = showRandomMovie;
