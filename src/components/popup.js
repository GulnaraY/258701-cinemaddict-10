/** Модуль для создания компонета класса для Попапа с детальной информацией */

import AbstractSmartComponent from './abstract-smart-component.js';
import {unrender} from '../utils/render.js';
import moment from 'moment';

/** Класс для создания компонента попапа
 * принимает на вход объект с данными
 */
export default class Popup extends AbstractSmartComponent {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._isWatched = this._filmData.isWatched;
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

    this._emojiMap = {
      SMILE: `smile.png`,
      SLEEPING: `sleeping.png`,
      GPUKE: `puke.png`,
      ANGRY: `angry.png`,
    };
    this._addToWatchlist = this.getElement().querySelector(`#watchlist`);
    this._markAsWatched = this.getElement().querySelector(`#watched`);
    this._markAsFavorite = this.getElement().querySelector(`#favorite`);
    this._isSetUserRating = false;
    this._isEmojiAdding = false;
    this._subscribeOnEvents();
  }

  /**
   * Возвращает разметку блока с комментариями
   * @return {String}
   * @private
   */
  _getCommentsMarkup() {
    return this._filmData.comments.map((comment) => `<li class="film-details__comment">
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
          </li>`).join(``);
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
    if (!(data instanceof Array)) {
      return `<td class="film-details__cell">${data}</td>`;
    } else {
      return `<td class="film-details__cell">
      ${data.map((genre) => `
      <span class="film-details__genre">${genre}</span>`).join(``)}
      </td>`;
    }
  }

  /**
   * Возвращает разметку с деталями фильма
   * @private
   * @return {String}
   */
  _getDetailsTable() {
    return `<table class="film-details__table">
    ${Object.keys(this._detailsMap).map((detail) => (`<tr class="film-details__row">
      <td class="film-details__term">${detail}</td>
      ${this._getDetailDataTemplate(this._detailsMap[detail])}
    </tr>`)).join(``)}
  </table>`;
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
      ${!this._isSetUserRating ? `` : this._getYourRatingTemplate()}
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._filmData.comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${this._getCommentsMarkup()}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${this._isEmojiAdding ? `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji">` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
               <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`;
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
            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
            <label class="film-details__user-rating-label" for="rating-1">1</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
            <label class="film-details__user-rating-label" for="rating-2">2</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
            <label class="film-details__user-rating-label" for="rating-3">3</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
            <label class="film-details__user-rating-label" for="rating-4">4</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
            <label class="film-details__user-rating-label" for="rating-5">5</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
            <label class="film-details__user-rating-label" for="rating-6">6</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
            <label class="film-details__user-rating-label" for="rating-7">7</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
            <label class="film-details__user-rating-label" for="rating-8">8</label>

            <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
            <label class="film-details__user-rating-label" for="rating-9">9</label>

          </div>
        </section>
      </div>
    </section>
  </div>`;
  }

  getTemplate() {
    return this._createPopup(this._details);
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.setCloseButtonClickHandler(() => {
      unrender(this);
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#watched`).addEventListener(`change`, () => {
      this._filmData.isWatched = !this._filmData.isWatched;
      this._controlsMap.watched.value = this._filmData.isWatched;
      if (this._filmData.isWatched) {
        this._isSetUserRating = true;
      } else {
        this._isSetUserRating = false;
        this._yourRating = ``;
      }
      this.rerender();
    });

    if (this._isSetUserRating) {
      element.querySelector(`.film-details__user-rating-score`)
      .addEventListener(`change`, (evt) => {
        this._yourRating = evt.target.value;
        this._isSetUserRating = false;
        this.rerender();
      });
    }

    element.querySelector(`.film-details__emoji-list`)
    .addEventListener(`change`, (evt) => {
      this._isEmojiAdding = true;
      this.rerender();
      element.querySelector(`.film-details__add-emoji-label`).querySelector(`img`).src = `./images/emoji/${this._emojiMap[evt.target.id.toString().slice(6).toUpperCase()]}`;
    });

  }

  rerender() {
    super.rerender();
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }

  setEscPressHandler(handler) {
    document.addEventListener(`keydown`, handler);
  }

  setAddToWatchlistHandler(handler) {
    this._addToWatchlist.addEventListener(`change`, handler);
  }

  setMarkAsWatchedHandler(handler) {
    this._markAsWatched.addEventListener(`change`, handler);
  }

  setMarkAsFavoriteHandler(handler) {
    this._markAsFavorite.addEventListener(`change`, handler);
  }
}
