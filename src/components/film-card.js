/**
 * * Модуль для генерации экзепляра класса для создания карточки фильма */

import {getRandomElement} from '../utils/util.js';
import AbstractComponent from './abstract-component.js';

/**
 *  Класс для генерации компонента карточки филька
 принимает на вход объект с моковыми данными
 */
export default class FilmCard extends AbstractComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
  }

  getTemplate() {
    return (`<article class="film-card">
      <h3 class="film-card__title">${this._filmData.title}</h3>
      <p class="film-card__rating">${this._filmData.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._filmData.releaseDate.toDateString()}</span>
        <span class="film-card__duration">${this._filmData.runTime}</span>
        <span class="film-card__genre">${getRandomElement(this._filmData.genres)}</span>
      </p>
      <img src="./images/posters/${this._filmData.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._filmData.description}</p>
      <a class="film-card__comments">${this._filmData.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._filmData.isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._filmData.isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._filmData.isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
    .addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
    .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
    .addEventListener(`click`, handler);
  }
}
