/** Модуль для генерации экземпляра класса для создании контейнера для карточек фильмов */

import AbstractComponent from './abstract-component.js';

/**
 *Класс для создания компонента контейнера фильмов
 */
export default class Filmscontainer extends AbstractComponent {
  constructor() {
    super();
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
      </section>
      ${this._createAdditionalBlocksMarkup()}
    </section>`);
  }

  getTemplate() {
    return this._createFilmsContainer(this._sortingMap);
  }
}
