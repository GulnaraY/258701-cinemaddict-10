/** Модуль для создания компонета класса для Попапа с детальной информацией */

import AbstractSmartComponent from './abstract-smart-component.js';
import {unrender} from '../utils/render.js';
import moment from 'moment';

/** Класс для создания компонента попапа
 * принимает на вход объект с данными
 */
export default class Popup extends AbstractSmartComponent {
  constructor(filmData, onDataChange, movieController) {
    super();
    this._filmData = filmData;
    this._onDataChange = onDataChange;
    this._movieController = movieController;
    this._yourRating = this._filmData.yourRating;
    this._detailsMap = {
      Director: this._filmData.director,
      Writers: this._filmData.writers,
      Actors: this._filmData.actors,
      [`Release Date`]: moment(this._filmData.releaseDate).format(`DD MMMM YYYY`),
      Runtime: moment.utc(this._filmData.runTime).format(`h[h] mm[m]`),
      Country: this._filmData.country,
      Genres: this._filmData.genres,
    };
    this._controlsMap = {
      watchlist:
      {
        value: this._filmData.isInWatchlist,
        label: `Add to watchlist`,
      },
      watched:
      {
        value: this._filmData.isWatched,
        label: `Already watched`,
      },
      favorite:
      {
        value: this._filmData.isFavorite,
        label: `Add to favorites`,
      }
    };

    this._ratingValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    this._emojiMap = {
      SMILE: `smile.png`,
      SLEEPING: `sleeping.png`,
      GPUKE: `puke.png`,
      ANGRY: `angry.png`,
    };
    const _element = this.getElement();
    this._addToWatchlistElement = _element.querySelector(`#watchlist`);
    this._markAsWatchedElement = _element.querySelector(`#watched`);
    this._markAsFavoriteElement = _element.querySelector(`#favorite`);

    this._isEmojiAdding = false;
    this._emojiCurrent = `#`;
    this._subscribeOnEvents();
  }

  /**
   * Возвращает разметку блока с комментариями
   * @return {String}
   * @private
   */
  _getCommentsMarkup() {
    return this._filmData.comments.map((comment) => `
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.reaction}.png" width="55" height="55" alt="emoji">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.name}</span>
            <span class="film-details__comment-day">${comment.date}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
    `).join(``);
  }

  _getNeedRatingAnswer() {
    return this._filmData.isWatched && !this._yourRating;
  }

  /**
   * Возвращает разметку пользовательских контроллов
   * @return {String}
   * @private
   */
  _getDetailsControlsMarkup() {
    return Object.keys(this._controlsMap).map((control) => `
          <input type="checkbox" class="film-details__control-input visually-hidden" id="${control}" name="control" ${this._controlsMap[control].value ? `checked` : ``}>
          <label for="${control}" class="film-details__control-label film-details__control-label--watchlist">${this._controlsMap[control].label}</label>
        `).join(``);
  }

  /**
   * Возвращает разметку одной строки детальной информации
   * @param {Any} data
   * @return {String}
   * @private
   */
  _getDetailDataTemplate(data) {
    if (!Array.isArray(data)) {
      return `<td class="film-details__cell">${data}</td>`;
    }

    return `<td class="film-details__cell">
      ${data.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
    </td>`;
  }

  /**
   * Возвращает разметку с деталями фильма
   * @private
   * @return {String}
   */
  _getDetailsTable() {
    const content = Object.keys(this._detailsMap).map((detail) => (
      `<tr class="film-details__row">
        ${this._getDetailTermTemplate(detail)}
        ${this._getDetailDataTemplate(this._detailsMap[detail])}
      </tr>`
    )).join(``);

    return `<table class="film-details__table">
      ${content}
    </table>`;
  }

  _getDetailTermTemplate(detail) {
    if (detail.toLowerCase() === `genres` && Array.from(this._detailsMap[detail]).length === 1) {
      return `<td class="film-details__term">Genre</td>`;
    }

    return `<td class="film-details__term">${detail}</td>`;
  }

  _getYourRatingTemplate() {
    return `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>

      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/${this._filmData.poster}" alt="film-poster" class="film-details__user-rating-img">
        </div>

        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${this._filmData.title}</h3>

          <p class="film-details__user-rating-feelings">How you feel it?</p>

          <div class="film-details__user-rating-score">
            ${this._ratingValues.map((value) => `
              <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${value}" id="rating-${value}">
              <label class="film-details__user-rating-label" for="rating-${value}">${value}</label>`).join(``)}
          </div>
        </section>
      </div>
    </section>
  </div>`;
  }

  /** Возвращает разметку попапа
   * @private
   * @return {String}
  */
  _createPopup() {
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${this._filmData.poster}" alt="">

            <p class="film-details__age">${this._filmData.age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._filmData.title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._filmData.rating}</p>
                ${this._yourRating ? `<p class="film-details__user-rating">Your rate ${this._yourRating}</p>` : ``}
              </div>
            </div>
            ${this._getDetailsTable()}
            <p class="film-details__film-description">
           ${this._filmData.description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${this._getDetailsControlsMarkup()}
        </section>
      </div>
      ${this._getNeedRatingAnswer() ? this._getYourRatingTemplate() : ``}
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._filmData.comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${this._getCommentsMarkup()}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${this._isEmojiAdding ? `<img src=${this._emojiCurrent} width="55" height="55" alt="emoji">` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${Object.keys(this._emojiMap).map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji.toLowerCase()}" value="${emoji.toLowerCase()}">
                  <label class="film-details__emoji-label" for="emoji-${emoji.toLowerCase()}">
                    <img src="./images/emoji/${this._emojiMap[emoji]}" width="30" height="30" alt="emoji">
                  </label>`).join(``)}

              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
  }

  getTemplate() {
    return this._createPopup(this._details);
  }

  /**
   * Подписка на события
   * @private
   */
  _subscribeOnEvents() {
    const element = this.getElement();
    this._watchedHandler(element);
    this._watchlistHandler(element);
    this._favoriteHandler(element);
    this._ratingHandler(element);
    this._emojiHandler(element);
  }

  /**
   * Подписка на нажатие watched
   * @param {*} element
   */
  _watchedHandler(element) {
    element.querySelector(`#watched`).addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._onDataChange(this._movieController, this._filmData, Object.assign({}, this._filmData, {
        isWatched: !this._filmData.isWatched,
        yourRating: this._filmData.isWatched ? `` : this._filmData.yourRating,
      }));
    });
  }

  /**
   * Подписка на нажатие watchlist
   * @param {*} element
   */
  _watchlistHandler(element) {
    element.querySelector(`#watchlist`).addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._onDataChange(this._movieController, this._filmData, Object.assign({}, this._filmData, {
        isInWatchlist: !this._filmData.isInWatchlist,
      }));
    });
  }

  /**
   * Подписка на нажатие favorite
   * @param {*} element
   */
  _favoriteHandler(element) {
    element.querySelector(`#favorite`).addEventListener(`change`, (evt) => {
      evt.preventDefault();
      this._onDataChange(this._movieController, this._filmData, Object.assign({}, this._filmData, {
        isFavorite: !this._filmData.isFavorite,
      }));
    });
  }

  /**
   * Подписка на установку рейтинга
   * @param {*} element
   */
  _ratingHandler(element) {
    if (this._getNeedRatingAnswer()) {
      element.querySelector(`.film-details__user-rating-score`).addEventListener(`change`, (evt) => {
        this._changeUserRating(evt.target.value);
        this.rerender();
      });
    }
  }

  /**
   * Подписка на выбор эмоджи
   * @param {*} element
   */
  _emojiHandler(element) {
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._isEmojiAdding = true;
        this._emojiCurrent = `./images/emoji/${this._emojiMap[evt.target.id.slice(6).toUpperCase()]}`;
        this.rerender();
      }
    });
  }

  /**
   * Установить значение рейтинга
   * @param {*} value
   */
  _changeUserRating(value = ``) {
    this._needUserRating = this._filmData.isWatched && !value;
    this._yourRating = value;
  }

  /**
   * Подписка на нажатие на крестик
   * @param {*} handler
   */
  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }

  /**
   * Восстановка подписок после перерендера
   */
  recoveryListeners() {
    this._subscribeOnEvents();
    this.setCloseButtonClickHandler(() => {
      unrender(this);
    });
  }
}
