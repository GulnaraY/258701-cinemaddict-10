/** Модуль для создания компонета класса для Попапа с детальной информацией */

import AbstractComponents from './abstract-component.js';
/** Класс для создания компонента попапа
 * принимает на вход объект с данными
 */
export default class Popup extends AbstractComponents {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._detailsMap = {
      Director: this._filmData.director,
      Writers: this._filmData.writers,
      Actors: this._filmData.actors,
      [`Release Date`]: this._filmData.releaseDate,
      Runtime: this._filmData.runTime,
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
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${this._controlsMap[control].label}</label>
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
                <p class="film-details__user-rating">Your rate ${this._filmData.yourRating}</p>
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

      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._filmData.comments.length}</span></h3>
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

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, handler);
  }
}
