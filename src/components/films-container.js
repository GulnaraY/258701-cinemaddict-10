/**
 * Генерирует верстку контейнера с фильмами
 *@exports createFilmsContainer()
 *@exports createAdditionalBlock()
 */

// import {createFilmCard} from './film-card.js';
import {filmsToRender} from '../main.js';
import {getSortedItems} from '../filters.js';
import FilmCardComponent from './film-card.js';
import {createElement} from '../util.js';


const sortingMap = {
  rating: `Top rated`,
  comments: `Most commented`,
};

/**
* Создает динамическую верстку блока с фильмами и доп блоков на основе моков
* @return {String} - верстка контентного блока
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

// ${getSortedItems(sorter).map((film) => new FilmCardComponent(film).getTemplate()).join(``)}


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
