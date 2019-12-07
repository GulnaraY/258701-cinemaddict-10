/** Модуль для создания компонета класса для Попапа с детальной информацией */

import {createElement} from '../util.js';

/** Модуль, возвращающий разметку попапа
 * @param {Object} details - данные из класса для формирования разметки
 * @return {String} - разметка попапа
 */
const createPopup = (details) => {
  const {title, description, poster, director, writers, actors, genres, age, rating, yourRating, country, releaseDate, runTime, isWatched, isFavorite, isInWatchlist, comments} = details;
  const detailsMap = {
    Director: director,
    Writers: writers,
    Actors: actors,
    [`Release Date`]: releaseDate,
    Runtime: runTime,
    Country: country,
    Genres: genres,
  };

  const controlsMap = {
    watchlist:
    {
      value: isInWatchlist,
      label: `Add to watchlist`,
    },
    watched:
    {
      value: isWatched,
      label: `Already watched`,
    },
    favorite:
    {
      value: isFavorite,
      label: `Add to favorites`,
    }
  };

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
              <p class="film-details__user-rating">Your rate ${yourRating}</p>
            </div>
          </div>
          ${getDetailsTable(detailsMap)}
          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        ${Object.keys(controlsMap).map((control) => `
          <input type="checkbox" class="film-details__control-input visually-hidden" id="${control}" name="control" ${controlsMap[control].value ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${controlsMap[control].label}</label>
        `).join(``)}
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        <ul class="film-details__comments-list">
          ${comments.map((comment) => `<li class="film-details__comment">
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
          </li>`).join(``)}
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
</section>`);
};

/** Класс для создания компонента попапа
 * принимает на вход объект с данными
 */
export default class Popup {
  constructor(details) {
    this._element = null;
    this._details = details;
  }

  getTemplate() {
    return createPopup(this._details);
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
