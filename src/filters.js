/**
 * Модуль для фильтрации и сортировки данных
*/

import {FilterType} from './controllers/filter.js';

/**
   * Сортировка данных от большего к меньшему
   * @param {Array} filmsToSort - фильмы для фильтрации
   * @param {String} sorter - ключ по которому будет происходить сортировка
   * @return {Array} - результирующий отсортированный и обрезанный массив
   */
const getSortedItems = (filmsToSort, sorter) => {
  return [...filmsToSort].sort((a, b) => {
    if (a[sorter] instanceof Array) {
      return b[sorter].length - a[sorter].length;
    }
    return b[sorter] - a[sorter];
  });
};

/**
   * Фильтрация данных и подсчет их количества
   * @param {String} filterValue - ключ по которому происходит фильтрация
   * @param {Array} films - массив с фильмами
   * @return {Number} - результирующее количество объектов, удовлетворяющих фильтру
   */
const getFilmsCount = (filterValue, films) => {

  return films.filter((film) => film[filterValue]).length;
};

const getWatchedMovies = (movies) => {
  return movies.filter((movie) => movie.isWatched);
};

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isInWatchlist);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((movie) => movie.isFavorite);
};

export const getMoviesByFilter = (movies, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getWatchedMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return movies;
};


export {getFilmsCount, getSortedItems, getWatchedMovies, getWatchlistMovies, getFavoriteMovies};
