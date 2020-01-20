export default class Movies {
  constructor() {
    this._movies = [];
  }

  getMovies() {

  }

  /**
   * Получить фильмы
   * @return {Array}
   */
  getMovies() {
    return this._movies;
  }

  /** Записать фильмы
   * @param {Any} movies
   */
  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  /** Обновление фильма
   * @param {String} id
   * @param {-} movie
   * @return {boolean}
   */
  updateMovie(id, movie) {
    const index = this._movies.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), movie, this._movies.slice(index + 1));

    return true;
  }

}
