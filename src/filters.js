import {films} from './main.js';
const ADDITIONAL_BLOCK_QUANTITY = 2;

const getSortedItems = (sorter) => {
  return [...films].sort((a, b) => {
    return b[sorter] - a[sorter];
  }).splice(0, ADDITIONAL_BLOCK_QUANTITY);
};

const getFilmsCount = (filterValue) => {
  return films.filter((film) => film[filterValue]).length;
};

export {getFilmsCount, getSortedItems};
