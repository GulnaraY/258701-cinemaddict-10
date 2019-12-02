import {getFilmsCount} from '../main.js';

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

export const generateFilters = () => {
  return menuBlocks.map((filter) => ({
    name: filter,
    count: getFilmsCount(filtersMap[filter]),
  }));
};
