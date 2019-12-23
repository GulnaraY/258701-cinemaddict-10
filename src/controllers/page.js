/** Контроллер для отрисовки карточек фильмов и навешивания обработчиков
 * событий
 */

import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import NoFilmsComponent from '../components/no-films.js';
import {getSortedItems} from '../filters.js';
import {render, unrender} from '../utils/render.js';
import SortingComponent, {SortMap} from '../components/sorting.js';
import MovieController from './movie.js';

const ONE_RENDER_QUANTITY = 5;
const ADDITIONAL_BLOCK_QUANTITY = 2;

/** Класс контроллера страницы */
export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsContainercomponent = new FilmsContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsListcontainer = null;

    this._onDataChange = this._onDataChange.bind(this);
  }

  /**
   * Точка входа для контроллера страницы
   * @public
   * @param {Array} films - массив с данными для фильмов
   */
  render(films) {
    this._films = films;
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

    const isLoadMore = Boolean(renderingFilms.length);
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
    new MovieController(container, this._onDataChange).render(film);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }
}
