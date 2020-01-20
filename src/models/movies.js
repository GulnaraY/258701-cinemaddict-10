export default class Movies {
  constructor() {
    this._movies = [];
  }

  getMovies() {

  }

  getMoviesAll() {
    return this._movies;
  }

  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  updateMovie(movieId, movie) {

  }
}
