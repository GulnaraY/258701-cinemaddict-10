/** Модуль для создания компонета класса для Попапа с детальной информацией */

import {createElement} from '../util.js';

/** Класс для создания компонента попапа
 * принимает на вход объект с данными
 */
export default class Popup {
  constructor({title, description, poster, director, writers, actors, genres, age, rating, yourRating, country, releaseDate, runTime, isWatched, isFavorite, isInWatchlist, comments}) {
    this._element = null;
    this._title = title;
    this._description = description;
    this._poster = poster;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._genres = genres;
    this._age = age;
    this._rating = rating;
    this._yourRating = yourRating;
    this._country = country;
    this._releaseDate = releaseDate;
    this._runTime = runTime;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
    this._isInWatchlist = isInWatchlist;
    this._comments = comments;
    this._detailsMap = {
      Director: this._director,
      Writers: this._writers,
      Actors: this._actors,
      [`Release Date`]: this._releaseDate,
      Runtime: this._runTime,
      Country: this._country,
      Genres: this._genres,
    };
    this._controlsMap = {
      watchlist:
      {
        value: this._isInWatchlist,
        label: `Add to watchlist`,
      },
      watched:
      {
        value: this._isWatched,
        label: `Already watched`,
      },
      favorite:
      {
        value: this._isFavorite,
        label: `Add to favorites`,
      }
    };
  }

  /**
   * Возвращает разметку блока с комментариями
   * @return {String}
   */
  _getCommentsMarkup() {
    return this._comments.map((comment) => `<li class="film-details__comment">
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
   */
  _getDetailsControlsMarkup() {
    return Object.keys(this._controlsMap).map((control) => `
          <input type="checkbox" class="film-details__control-input visually-hidden" id="${control}" name="control" ${this._controlsMap[control].value ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${this._controlsMap[control].label}</label>
        `).join(``);
  }

  /**
   * Возвращает разметку одной строки детальной информации
   * @param {Any} data
   * @return {String}
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
            <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

            <p class="film-details__age">${this._age}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">Your rate ${this._yourRating}</p>
              </div>
            </div>
            ${this._getDetailsTable()}
            <p class="film-details__film-description">
           ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          ${this._getDetailsControlsMarkup()}
        </section>
      </div>

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
            <ul class="film-details__comments-list">
              ${this._getCommentsMarkup()}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

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

  getTemplate() {
    return this._createPopup(this._details);
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
