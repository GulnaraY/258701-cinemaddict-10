/** */

import {render, replace} from '../utils/render.js';
import {ESC_CODE} from '../utils/util.js';
import FilmCardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.DEFAULT;

    this._openPopup = this._openPopup.bind(this);
    this._onPopupEscPress = this._onPopupEscPress.bind(this);
    this._onPopupClickCloseButton = this._onPopupClickCloseButton.bind(this);
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmComponent = new FilmCardComponent(film);
    this._popupComponent = new PopupComponent(film, this._onDataChange, this);

    this._filmComponent.setOpenHandler(this._openPopup);
    this._popupComponent.setCloseButtonClickHandler(this._onPopupClickCloseButton);

    this._setFilmComponentControlsHandlers(film);

    if (oldFilmComponent && oldPopupComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

  /**
   * Подписка на события карточки
   *
   * @param {Any} film
   */
  _setFilmComponentControlsHandlers(film) {
    this._filmComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._filmComponent.setMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmComponent.setMarkAsFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });
  }

  /**
   * Нажатие на крестик попапа
   */
  _onPopupClickCloseButton() {
    this._hidePopup();
  }

  /**
   * Событие нажатия на Esc
   *
   * @param {Event} evt
   */
  _onPopupEscPress(evt) {
    if (evt.keyCode === ESC_CODE) {
      this._hidePopup();
    }
  }

  /**
   * Закрыть попап
   */
  _hidePopup() {
    this._popupComponent.getElement().remove();
    this._mode = Mode.DEFAULT;
    document.removeEventListener(`keydown`, this._onPopupEscPress);
  }

  /**
   * Открыть попап
   */
  _openPopup() {
    // дергаем триггер, что открывем один попап – закрываем другой, если он открыт вдруг
    this._onViewChange();
    this._mode = Mode.DETAILS;

    render(this._container.parentNode.parentNode.parentNode, this._popupComponent);
    document.addEventListener(`keydown`, this._onPopupEscPress);
  }

  /**
   * Закрываем попап, если он вдруг открыт
   */
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hidePopup();
    }
  }
}
