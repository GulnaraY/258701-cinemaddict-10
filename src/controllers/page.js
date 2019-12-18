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

  /**
   * Точка входа для контроллера страницы
   * @public
   * @param {Array} films - массив с данными для фильмов
   */
  render(films) {

    render(this._container, this._sortingComponent);
    if (!films.length) {
      render(this._container, this._noFilmsComponent);
    } else {
      this._renderFilmData(films);
      this._sortingComponent.setSortTypeChangeHandler((sortType) => {
        let sortedFilms = [];
        let isDefaultList = true;
        switch (sortType) {
          case SortMap.DATE:
            sortedFilms = getSortedItems(films, `releaseDate`);
            isDefaultList = false;
            break;
          case SortMap.RATING:
            sortedFilms = getSortedItems(films, `rating`);
            isDefaultList = false;
            break;
          case SortMap.DEFAULT:
            sortedFilms = [...films];
            break;
        }
        unrender(this._loadMoreButtonComponent);
        this._filmsListContainer.innerHTML = ``;

        if (isDefaultList) {
          this._renderMainFilmsList(sortedFilms);
        } else {
          this._renderSortedFilmsList(sortedFilms);
        }

      });
    }
  }

  /**
   * Рендеринг сортированных фильмов
   * @param {Array} films - отсортированный массив фильмов
   */
  _renderSortedFilmsList(films) {
    films.forEach((film) => {
      this._renderFilm(film, this._filmsListContainer);
    });
  }

  /**
   * Рендеринг основного блока фильмов
   * @private
   * @param {Array} films - список фильмов
    */
  _renderMainFilmsList(films) {
    const renderingFilms = [...films];
    const filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

    filmsToRender.forEach((film) => {
      this._renderFilm(film, this._filmsListContainer);
    });

    const isLoadMore = Boolean(renderingFilms.length)
    if (isLoadMore) {
      this._renderLoadMoreFunctional(renderingFilms);
    }
  }

  /**
   * Рендеринг кнопки showMore и фильмов по кнопке
   * @private
   * @param {Array} renderingFilms
   */
  _renderLoadMoreFunctional(renderingFilms) {
    render(this._container.querySelector(`.films-list`), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
      filmsToRender.forEach((film) => this._renderFilm(film, this._filmsListContainer));

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
