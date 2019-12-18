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
import SortingComponent, {SortMap} from '../components/sorting.js';

const ONE_RENDER_QUANTITY = 5;
const ADDITIONAL_BLOCK_QUANTITY = 2;

/** Класс контроллера страницы */
export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsContainercomponent = new FilmsContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsListcontainer = null;
  }

  render(films) {

    render(this._container, this._sortingComponent);
    if (!films.length) {
      render(this._container, this._noFilmsComponent);
    } else {
      this._renderFilmData(films);
      this._sortingComponent.setSortTypeChangeHandler((sortType) => {
        let sortedFilms = [];

        switch (sortType) {
          case SortMap.DATE:
            sortedFilms = getSortedItems(films, `releaseDate`);
            break;
          case SortMap.RATING:
            sortedFilms = getSortedItems(films, `rating`);
            break;
          case SortMap.DEFAULT:
            sortedFilms = [...films];
            break;
        }
        unrender(this._loadMoreButtonComponent);
        this._filmsListContainer.innerHTML = ``;


        this._renderMainFilmsList(sortedFilms);
      });
    }
  }

  _renderMainFilmsList(films) {
    const renderingFilms = [...films];
    let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

    filmsToRender.forEach((film) => {
      this._renderFilm(film, this._filmsListContainer);
    });

    this._renderLoadMoreFunctional(filmsToRender, renderingFilms);
  }

  _renderLoadMoreFunctional(filmsToRender, renderingFilms) {
    render(this._container.querySelector(`.films-list`), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      if (filmsToRender.length) {
        filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
        filmsToRender.forEach((film) => this._renderFilm(film, this._filmsListContainer));
      }

      if (!renderingFilms.length) {
        unrender(this._loadMoreButtonComponent);
      }
    });
  }

  /**
   * @private
   * @param {Array} films массив с данными о фильмах
   */
  _renderFilmData(films) {

    render(this._container, this._filmsContainercomponent);
    this._filmsListContainer = this._container.querySelector(`.films-list__container`);
    const addBlockRenderPlace = this._container.querySelectorAll(`.films-list--extra .films-list__container`);

    this._renderMainFilmsList(films);

    const renderData = {
      topRatedFilms: {
        data: getSortedItems(films, `rating`).slice(0, ADDITIONAL_BLOCK_QUANTITY),
        place: addBlockRenderPlace[0],
      },
      mostCommentedFilms: {
        data: getSortedItems(films, `comments`).slice(0, ADDITIONAL_BLOCK_QUANTITY),
        place: addBlockRenderPlace[1],
      }
    };

    Object.keys(renderData).map((key) => renderData[key].data.forEach((film) => {
      this._renderFilm(film, renderData[key].place);
    }));
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
