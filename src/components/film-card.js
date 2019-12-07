/**
 * * Модуль для генерации экзепляра класса для создания карточки фильма */

import {createElement, getRandomElement} from '../util.js';

/**
 *  Класс для генерации компонента карточки филька
 принимает на вход объект с моковыми данными
 */
export default class FilmCard {
  constructor({title, description, rating, releaseDate, genres, poster, isWatched, comments, runTime, isFavorite, isInWatchlist}) {
    this._description = description;
    this._title = title;
    this._rating = rating;
    this._year = releaseDate;
    this._genre = getRandomElement(genres);
    this._poster = poster;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._isInWatchlist = isInWatchlist;
    this._comments = comments.length;
    this._duration = runTime;
    this._element = null;
  }

  getTemplate() {
    return (`<article class="film-card">
      <h3 class="film-card__title">${this._title}</h3>
      <p class="film-card__rating">${this._rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._year}</span>
        <span class="film-card__duration">${this._duration}</span>
        <span class="film-card__genre">${this._genre}</span>
      </p>
      <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isInWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`);
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
