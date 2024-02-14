// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden");
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = async () => {
  displayLikedMovie(currentMovie[0]);
  clearCurrentMovie();
  showRandomMovie();
  currentMovie.pop();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
  currentMovie.pop();
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(
    movieInfo.poster_path,
    movieInfo.imdb_id
  );
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);
  const voteAverage = createMovieVoteAverage(movieInfo.vote_average);
  const releaseDate = createMovieReleaseDate(movieInfo.release_date);

  console.log('movieInfogenre: ' + movieInfo.id);
  // Append title, poster, popularity, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);
  movieTextDiv.appendChild(releaseDate);
  movieTextDiv.appendChild(voteAverage);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};

// Create HTML for movie poster
const createMoviePoster = (posterPath, imdb_id) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
  console.log(`posterURL: ${posterPath}`);

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  // Create link to movie's page on IMDB
  const link = document.createElement("a");
  link.setAttribute("target", "_blank");
  link.setAttribute("href", `http://www.imdb.com/title/${imdb_id}/`);

  // Append img to link
  link.appendChild(posterImg);

  return link;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Create HTML for movie vote average
const createMovieVoteAverage = (vote_avg) => {
  const voteAverageDiv = document.createElement("div");
  voteAverageDiv.setAttribute("class", "vote-average");
  voteAverageDiv.innerHTML = "⭐ " + Math.ceil(vote_avg * 10) / 10;

  console.log(`vote average: ${vote_avg}`);

  return voteAverageDiv;
};

// Create HTML for movie release date
const createMovieReleaseDate = (release_date) => {
  const releaseDateDiv = document.createElement("div");
  releaseDateDiv.setAttribute("class", "release-date");
  releaseDateDiv.innerHTML = 'Release date: ' + release_date;

  console.log(`release date: ${release_date}`);

  return releaseDateDiv;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};
