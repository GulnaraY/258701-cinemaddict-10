import {FilterType} from '../controllers/filter.js';
import {getMoviesByFilter} from '../filters.js';

export default class Movies {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL;

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getMoviesAll() {
    return this._movies;
  }

  /**
   * Получить фильмы
   * @return {Array}
   */
  getMovies() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  /** Записать фильмы
   * @param {Any} movies
   */
  setMovies(movies) {
    this._movies = Array.from(movies);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
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
    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

}
