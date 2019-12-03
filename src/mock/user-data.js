/**
 * Генерация данных пользователя
 * @exports getUserRating()
 */
import {getRandomNumber} from '../util.js';

/**
* Генерирует рейтинг пользователя на основе просмотренных фильмов
* @return {Number} - случайное число, количество просмотренных фильмов
*/
export const getUserRating = () => {
  return getRandomNumber(1000);
};
