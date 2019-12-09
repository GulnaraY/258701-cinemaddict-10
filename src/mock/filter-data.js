/**
 * Модуль для генерации данных для фильтров
 * @exports generateFilters
 */

import {getFilmsCount} from '../filters.js';

const menuBlocks = [
  `All movies`,
  `Watchlist`,
  `History`,
  `Favorites`,
  `Stats`,
];

const filtersMap = {
  Watchlist: `isInWatchlist`,
  History: `isWatched`,
  Favorites: `isFavorite`,
};

/**
* Генерирует данные для фильтров
* @param {Array} films - массив с фильмами
* @return {Array} - массив объектов, свойствами которого являются фильтры и их количество
*/
export const generateFilters = (films) => {

  return menuBlocks.map((filter) => ({
    name: filter,
    count: getFilmsCount(filtersMap[filter], films),
  }));
};
