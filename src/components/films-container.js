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

  /**
   * Возвращает разметку дополнительного блока
   * @return {String}
   * @private
   */
  _createAdditionalBlocksMarkup() {
    return Object.keys(this._sortingMap).map((sorter) => (`<section class="films-list--extra">
      <h2 class="films-list__title">${this._sortingMap[sorter]}</h2>
      <div class="films-list__container">
      </div>
    </section>`)).join(``);
  }

  /**
   * возвращает разметку контейнера фильмов
   * @return {String}
   * @private
   */
  _createFilmsContainer() {
    return (`<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
        </div>
        ${this._showMoreButton.getTemplate()}
      </section>
      ${this._createAdditionalBlocksMarkup()}
    </section>`);
  }

  /**
   * Верстка контейнера фильмов без данных
   * @return {String}
   * @private
   */
  _createFilmContainerNoData() {
    return (`<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`);
  }

  getTemplate() {
    return this._createFilmsContainer(this._showMoreButton, this._sortingMap);
  }

  getNoDataTemplate() {
    return this._createFilmContainerNoData();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getNoDataElement() {
    if (!this._element) {
      this._element = createElement(this.getNoDataTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
