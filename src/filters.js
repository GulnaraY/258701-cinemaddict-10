/**
 * Модуль для фильтрации и сортировки данных
 * @exports getFilmsCount()
 * @exports getSortedItems()
 */
import {films} from './main.js';
const ADDITIONAL_BLOCK_QUANTITY = 2;

const getSortedItems = (filmsToSort, sorter) => {
  /**
   * Сортировка данных от большего к меньшему
   * @param {String} sorter - ключ по которому будет происходить сортировка
   * @returns {Array} - результирующий отсортированный и обрезанный массив
   */
  return [...filmsToSort].sort((a, b) => {
    if (a[sorter] instanceof Array) {
      return b[sorter].length - a[sorter].length;
    }
    return b[sorter] - a[sorter];
  }).splice(0, ADDITIONAL_BLOCK_QUANTITY);
};

const getFilmsCount = (filterValue) => {
  /**
   * Фильтрация данных и подсчет их количества
   * @param {String} filterValue - ключ по которому происходит фильтрация
   * @returns {Number} - результирующее количество объектов, удовлетворяющих фильтру
   */
  return films.filter((film) => film[filterValue]).length;
};

export {getFilmsCount, getSortedItems};
