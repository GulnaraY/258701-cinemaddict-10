/**
 * Модуль для фильтрации и сортировки данных
 * @exports getFilmsCount()
 * @exports getSortedItems()
 */

const ADDITIONAL_BLOCK_QUANTITY = 2;

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
  }).splice(0, ADDITIONAL_BLOCK_QUANTITY);
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

export {getFilmsCount, getSortedItems};
