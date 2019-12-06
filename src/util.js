/**
 * Модуль со служебными функциями
 */

/**
 * Возвращает случайное целое число из диапазона включая границы
 * @param {Number} max - верхняя граница
 * @param {Number} min - нижняя граница
 * @return {Number} - случайное число
 */
const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 *Возвращает случайное вещественное число с одним знаком после запятой из диапазона
 * @param {Number} max - верхняя граница
 * @param {Number} min - нижняя граница
 * @return {Number} - случайное число
 */
const getRandomFloatNumber = (max, min = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

/**
 * Получает случайный элемент массива или коллекции
 * @param {Array/Set} elements
 * @return {Any} - содержимое случайного элемента массива
 */
const getRandomElement = (elements) => {
  if (!Array.isArray(elements)) {
    elements = Array.from(elements);
  }

  return elements[getRandomNumber(elements.length - 1)];
};

/**
 * Позволяет получить случайое булево значение
 * @return {Boolean} - случайное булево значение
 */
const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

/**
 * Выбирает случайное количество(в заданном диапазоне) элементов массива
 *  или подобного ему объекта и возвращает из в виде строки
 * @param {Object} elements - исходный экземпляр
 * @param {Number} minquantity - нижняя граница количества
 * @param {Number} maxquantity - верхняя граница количества
 * @param {String} divider - разделитель
 * @return {String} - результирующая строка
 */
const getRandomPart = (elements, minquantity, maxquantity, divider = ` `) => {

  if (!Array.isArray(elements)) {
    elements = Array.from(elements);
  }
  const quantity = getRandomNumber(maxquantity, minquantity);
  const resultArray = [];
  for (let i = 1; i <= quantity; i++) {
    resultArray.push(getRandomElement(elements));
  }
  return resultArray.join(divider);
};

/**
 *Рендер компонентов на страницу
 * @param {Object} container
 * @param {String} template
 * @param {String} place
 */
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export {getRandomNumber, getRandomBoolean, getRandomFloatNumber, getRandomPart, getRandomElement, render};
