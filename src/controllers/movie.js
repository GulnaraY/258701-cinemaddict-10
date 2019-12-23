/** */

import {render, unrender} from '../utils/render.js';
import {ESC_CODE} from '../utils/util.js';
import FilmCardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';

export default class MovieController {
  constructor(container) {
    this._container = container;
  }

  render(film) {
    this._renderFilm(film, this._container);
  }

  /**
  * Рендерит карточки фильмов, по ходу навешивая обработчики событий
  * @param {Object} film - объект с данными по фильм
  * @param {Object} container - дом нода в которую рендерим элемент
  * @private
  */
  _renderFilm(film, container) {
    const filmCard = new FilmCardComponent(film);
    const filmPopup = new PopupComponent(film);

    filmCard.setOpenHandler(() => {
      this._openPopup(filmPopup);
    });

    render(container, filmCard);
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
