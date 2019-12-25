/** */

import {render, unrender, replace} from '../utils/render.js';
import {ESC_CODE} from '../utils/util.js';
import FilmCardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmComponent = null;
    this._popupComponent = null;
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldPopupComponent = this._popupComponent;

    this._filmComponent = new FilmCardComponent(film);
    this._popupComponent = new PopupComponent(film);

    this._filmComponent.setOpenHandler(() => {
      this._openPopup(this._popupComponent);
    });

    this._setFilmComponentControlsHandlers(film);
    this._setPopupComponentControlsHandlers(film);

    if (oldFilmComponent && oldPopupComponent) {
      replace(this._filmComponent, oldFilmComponent);
    } else {
      render(this._container, this._filmComponent);
    }
  }

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

  _setPopupComponentControlsHandlers(film) {
    this._popupComponent.setAddToWatchlistHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isInWatchlist: !film.isInWatchlist,
      }));
    });

    this._popupComponent.setMarkAsWatchedHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: film.isWatched,
      }));
    });

    this._popupComponent.setMarkAsFavoriteHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });
  }
  /**
  * Логика открытия попапа
  * @private
  * @param {Class} filmPopup - инстанс класса Popup
  */
  _openPopup(filmPopup) {
    const onPopupEscPress = (evt) => {
      if (evt.keyCode === ESC_CODE) {
        document.removeEventListener(`keydown`, onPopupEscPress);
        unrender(filmPopup);
      }
    };

    const addClosePopupListener = () => {
      filmPopup.setCloseButtonClickHandler(() => {
        document.removeEventListener(`keydown`, onPopupEscPress);
        unrender(filmPopup);
      });
    };

    filmPopup.setEscPressHandler((onPopupEscPress));

    filmPopup.setCloseButtonClickHandler(() => {
      document.removeEventListener(`keydown`, onPopupEscPress);
      unrender(filmPopup);
    });

    render(this._container.parentNode, filmPopup);
    addClosePopupListener();
  }
}
