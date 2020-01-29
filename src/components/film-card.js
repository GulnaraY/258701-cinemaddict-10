/**
 * * Модуль для генерации экзепляра класса для создания карточки фильма */

import {getRandomElement} from '../utils/util.js';
import AbstractComponent from './abstract-component.js';
import moment from 'moment';

/**
 *  Класс для генерации компонента карточки филька
 принимает на вход объект с моковыми данными
 */
export default class FilmCard extends AbstractComponent {
  constructor(filmData) {
    super();

    this._filmData = filmData;
    this._element = this.getElement();
  }

  getTemplate() {
    return (`<article class="film-card">
      <h3 class="film-card__title">${this._filmData.title}</h3>
      <p class="film-card__rating">${this._filmData.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._filmData.releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.utc(new Date(this._filmData.runTime)).format(`H[h] mm[m]`)}</span>
        <span class="film-card__genre">${getRandomElement(this._filmData.genres)}</span>
      </p>
      <img src="${this._filmData.poster}" alt="" class="film-card__poster">
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
    const title = this._element.querySelector(`.film-card__title`);

    title.addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    const poster = this._element.querySelector(`.film-card__poster`);

    poster.addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    const comments = this._element.querySelector(`.film-card__comments`);

    comments.addEventListener(`click`, handler);
  }

  setOpenHandler(handler) {
    this.setTitleClickHandler(handler);
    this.setPosterClickHandler(handler);
    this.setCommentsClickHandler(handler);
  }

  setAddToWatchlistHandler(handler) {
    const addToWatchlist = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);

    addToWatchlist.addEventListener(`click`, handler);
  }

  setMarkAsWatchedHandler(handler) {
    const markAsWatched = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);

    markAsWatched.addEventListener(`click`, handler);
  }

  setMarkAsFavoriteHandler(handler) {
    const markAsFavorite = this._element.querySelector(`.film-card__controls-item--favorite`);

    markAsFavorite.addEventListener(`click`, handler);
  }
}
