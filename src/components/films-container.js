/**
 * Генерирует верстку контейнера с фильмами
 *@exports createFilmsContainer()
 *@exports createAdditionalBlock()
 */

import {createFilmCard} from './film-card.js';
import {createShowMoreButton} from './show-more-button.js';
import {filmsToRender} from '../main.js';
import {getSortedItems} from '../filters.js';

const sortingMap = {
  rating: `Top rated`,
  comments: `Most commented`,
};

/**
* Создает динамическую верстку блока с фильмами и доп блоков на основе моков
* @return {String} - верстка контентного блока
*/
const createFilmsContainer = () => {

  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
      ${filmsToRender.map((film) => createFilmCard(film)).join(``)}
    </div>
    ${createShowMoreButton()}
  </section>
  ${Object.keys(sortingMap).map((sorter) => (`<section class="films-list--extra">
    <h2 class="films-list__title">${sortingMap[sorter]}</h2>
    <div class="films-list__container">
      ${getSortedItems(sorter).map((film) => createFilmCard(film)).join(``)}
    </div>
  </section>`)).join(``)}
  </section>`);
};

/**
* Создает верстку дополнительной группы карточек после нажатия на showMoreButton
* @param {Array} films - моковые данные для отрисовки блока
* @return {String} - верстка дополнительного блока
*/
const createAdditionalBlock = (films) => {
  return `${films.map((film) => createFilmCard(film)).join(``)}`;
};

export {createFilmsContainer, createAdditionalBlock};
