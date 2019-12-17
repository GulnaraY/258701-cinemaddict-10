/** Контроллер для отрисовки карточек фильмов и навешивания обработчиков
 * событий
 */

import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmCardComponent from '../components/film-card';
import PopupComponent from '../components/popup.js';
import FilmsContainerComponent from '../components/films-container.js';
import NoFilmsComponent from '../components/no-films.js';
import {getSortedItems} from '../filters.js';
import {render, unrender} from '../utils/render.js';
import {ESC_CODE} from '../utils/util.js';

const ONE_RENDER_QUANTITY = 5;

/** Класс контроллера страницы */
export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsContainer = new FilmsContainerComponent();
  }

  render(films) {
    this._renderFilmData(films);
  }

  /**
   * @private
   * @param {Array} films массив с данными о фильмах
   */
  _renderFilmData(films) {
    if (!films.length) {
      render(this._container, this._noFilmsComponent);
    } else {

      const renderingFilms = [...films];
      let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

      render(this._container, this._filmsContainer);
      const filmsContainer = this._container.querySelector(`.films-list .films-list__container`);
      const addBlockRenderPlace = this._container.querySelectorAll(`.films-list--extra .films-list__container`);
      const renderData = {
        randomFilms: {
          data: filmsToRender,
          place: filmsContainer
        },
        topRatedFilms: {
          data: getSortedItems(films, `rating`),
          place: addBlockRenderPlace[0],
        },
        mostCommentedFilms: {
          data: getSortedItems(films, `comments`),
          place: addBlockRenderPlace[1],
        }
      };

      Object.keys(renderData).map((key) => renderData[key].data.forEach((film) => {
        this._renderFilm(film, renderData[key].place);
      }));
      render(this._container.querySelector(`.films-list`), this._loadMoreButtonComponent);
      this._loadMoreButtonComponent.setClickHandler(() => {
        if (renderingFilms.length) {
          filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
          filmsToRender.map((film) => this._renderFilm(film, filmsContainer));
        }

        if (!renderingFilms.length) {
          unrender(this._loadMoreButtonComponent);
        }
      });
    }
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

      document.addEventListener(`keydown`, onPopupEscPress);
    };

    filmCard.setTitleClickHandler(() => {
      render(this._container.parentNode, filmPopup);
      addClosePopupListener();
    });

    filmCard.setPosterClickHandler(() => {
      render(this._container.parentNode, filmPopup);
      addClosePopupListener();
    });

    filmCard.setCommentsClickHandler(() => {
      render(this._container.parentNode, filmPopup);
      addClosePopupListener();
    });

    filmPopup.setCloseButtonClickHandler(() => {
      document.removeEventListener(`keydown`, onPopupEscPress);
      unrender(filmPopup);
    });

    render(container, filmCard);
  }
}
