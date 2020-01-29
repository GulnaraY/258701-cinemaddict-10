export default class Movie {
  constructor(data) {
    this._data = data;
  }

  toRAW() {
    return this._data;
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
