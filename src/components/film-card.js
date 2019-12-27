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
    const _element = this.getElement();

    this._title = _element.querySelector(`.film-card__title`);
    this._poster = _element.querySelector(`.film-card__poster`);
    this._comments = _element.querySelector(`.film-card__comments`);
    this._addToWatchlist = _element.querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._markAsWatched = _element.querySelector(`.film-card__controls-item--mark-as-watched`);
    this._markAsFavorite = _element.querySelector(`.film-card__controls-item--favorite`);
  }

  getTemplate() {
    return (`<article class="film-card">
      <h3 class="film-card__title">${this._filmData.title}</h3>
      <p class="film-card__rating">${this._filmData.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${moment(this._filmData.releaseDate).format(`YYYY`)}</span>
        <span class="film-card__duration">${moment.utc(this._filmData.runTime).format(`h[h] mm[m]`)}</span>
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
    this._title.addEventListener(`click`, handler);
  }

  setPosterClickHandler(handler) {
    this._poster.addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this._comments.addEventListener(`click`, handler);
  }

  setOpenHandler(handler) {
    this.setTitleClickHandler(handler);
    this.setPosterClickHandler(handler);
    this.setCommentsClickHandler(handler);
  }

  setAddToWatchlistHandler(handler) {
    this._addToWatchlist.addEventListener(`click`, handler);
  }

  setMarkAsWatchedHandler(handler) {
    this._markAsWatched.addEventListener(`click`, handler);
  }

  setMarkAsFavoriteHandler(handler) {
    this._markAsFavorite.addEventListener(`click`, handler);
  }

}
