/** Модуль для генерации экземпляра класса для создании контейнера для карточек фильмов */

import {createElement} from '../util.js';

/**
 *Класс для создания компонента контейнера фильмов
принимает на вход ссылку на созданный компонент showMoreButton
 */
export default class Filmscontainer {
  constructor(showMore) {
    this._element = null;
    this._showMoreButton = showMore;
    this._sortingMap = {
      rating: `Top rated`,
      comments: `Most commented`,
    };
  }

  _createFilmsContainer() {
    return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
       ${this._showMoreButton.getTemplate()}
    </section>
     ${Object.keys(this._sortingMap).map((sorter) => (`<section class="films-list--extra">
      <h2 class="films-list__title">${this._sortingMap[sorter]}</h2>
      <div class="films-list__container">
      </div>
    </section>`)).join(``)}
    </section>`);
  }

  getTemplate() {
    return this._createFilmsContainer(this._showMoreButton, this._sortingMap);
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
