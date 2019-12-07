/** Модуль для генерации экземпляра класса для создании контейнера для карточек фильмов */

import {createElement} from '../util.js';

const sortingMap = {
  rating: `Top rated`,
  comments: `Most commented`,
};

/**
 * Метод возвращающий верстку контейнера фильмов
 * @param {Class} showMoreButton - экземпляр класса ShowMoreButton
 * @return {String}- разметка
 */
const createFilmsContainer = (showMoreButton) => {
  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
     ${showMoreButton.getTemplate()}
  </section>
   ${Object.keys(sortingMap).map((sorter) => (`<section class="films-list--extra">
    <h2 class="films-list__title">${sortingMap[sorter]}</h2>
    <div class="films-list__container">
    </div>
  </section>`)).join(``)}
  </section>`);
};

/**
 *Класс для создания компонента контейнера фильмов
принимает на вход ссылку на созданный компонент showMoreButton
 */
export default class Filmscontainer {
  constructor(showMore) {
    this._element = null;
    this._showMoreButton = showMore;
  }

  getTemplate() {
    return createFilmsContainer(this._showMoreButton);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
