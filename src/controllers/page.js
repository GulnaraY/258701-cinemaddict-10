/** Контроллер для отрисовки карточек фильмов и навешивания обработчиков
 * событий
 */

import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmsContainerComponent from '../components/films-container.js';
import NoFilmsComponent from '../components/no-films.js';
import {getSortedItems} from '../filters.js';
import {render, remove} from '../utils/render.js';
import SortingComponent, {SortMap} from '../components/sorting.js';
import MovieController from './movie.js';

const ONE_RENDER_QUANTITY = 5;
const ADDITIONAL_BLOCK_QUANTITY = 2;

/** Класс контроллера страницы */
export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._moviesControllers = [];
    this._noFilmsComponent = new NoFilmsComponent();
    this._loadMoreButtonComponent = new ShowMoreButtonComponent();
    this._filmsContainerComponent = new FilmsContainerComponent();
    this._sortingComponent = new SortingComponent();
    this._filmsListcontainer = null;
    this._hasLoadButton = false;

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._moviesModel.setFilterChangeHandler(this._onFilterChange);

    this._visibledCards = ONE_RENDER_QUANTITY;
  }

  /**
   * Точка входа для контроллера страницы
   * @public
   * @param {Array} films - массив с данными для фильмов
   */
  render() {
    const movies = this._moviesModel.getMovies();
    if (!movies.length) {
      render(this._container, this._noFilmsComponent);

      return;
    }

    render(this._container, this._sortingComponent);

    this._renderContent(movies);
    this._sortSubscribe();
  }

  _sortSubscribe() {
    this._sortingComponent.setSortTypeChangeHandler((sortType) => {
      let sortedFilms = [];
      const movies = this._moviesModel.getMovies();
      switch (sortType) {
        case SortMap.DATE:
          sortedFilms = getSortedItems(movies, `releaseDate`);
          break;
        case SortMap.RATING:
          sortedFilms = getSortedItems(movies, `rating`);
          break;
        case SortMap.DEFAULT:
          sortedFilms = [...movies];
          break;
      }

      this._filmsListContainer.innerHTML = ``;

      this._renderFilmsList(sortedFilms.slice(0, this._visibledCards));
    });
  }

  /**
   * Рендеринг основного блока фильмов
   *
   * @param {Array} films
   * @private
    */
  _renderFilmsList(films) {
    films.forEach((film) => {
      this._renderFilm(film, this._filmsListContainer);
    });

    if (!this._hasLoadButton && this._isLoadMore()) {
      this._renderLoadMoreButton();
    } else if (this._hasLoadButton && !this._isLoadMore()) {
      this._hasLoadButton = false;
      remove(this._loadMoreButtonComponent);
    }
  }

  /**
   * Рендер кнопки дозагрузки и подписка на событие клика
   */
  _renderLoadMoreButton() {
    this._hasLoadButton = true;

    render(this._container.querySelector(`.films-list`), this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  /**
   * Нужна ли кнопка дозагрузки
   *
   * @private
   * @return {Boolean}
   */
  _isLoadMore() {
    return this._visibledCards < this._moviesModel.getMovies().length;
  }

  /**
   * @private
   * @param {Array} films массив с данными о фильмах
   */
  _renderContent(films) {
    render(this._container, this._filmsContainerComponent);

    this._filmsListContainer = this._container.querySelector(`.films-list__container`);

    this._renderFilmsList(films.slice(0, this._visibledCards));
    this._renderFilmsExtra();
  }

  /**
   * Рендер фильмов из топа (нижняя часть)
   */
  _renderFilmsExtra() {
    const addBlockRenderPlace = this._container.querySelectorAll(`.films-list--extra .films-list__container`);
    const movies = this._moviesModel.getMovies();
    const renderData = [
      {
        films: getSortedItems(movies, `rating`).slice(0, ADDITIONAL_BLOCK_QUANTITY),
        place: addBlockRenderPlace[0],
      },
      {
        films: getSortedItems(movies, `comments`).slice(0, ADDITIONAL_BLOCK_QUANTITY),
        place: addBlockRenderPlace[1],
      }
    ];

    renderData.forEach((data) => data.films.forEach((film) => {
      this._renderFilm(film, data.place);
    }));
  }

  /**
  * Рендерит карточки фильмов и добавляет в список контроллер
  *
  * @param {Object} film - объект с данными по фильм
  * @param {Object} container - дом нода в которую рендерим элемент
  * @private
  */
  _renderFilm(film, container) {
    const controller = new MovieController(container, this._onDataChange, this._onViewChange);

    this._moviesControllers = this._moviesControllers.concat(controller);

    controller.render(film);
  }

  /**
   * Изменение данных
   *
   * @param {Any} movieController
   * @param {Array} oldData
   * @param {Array} newData
   */
  _onDataChange(movieController, oldData, newData) {
    if (newData === null) {
      newData = this._moviesModel.removeComment(oldData);
    }
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }

  }

  /**
   * Изменение статуса попапа (закрываем открытый/текущий попап)
   */
  _onViewChange() {
    this._moviesControllers.forEach((controller) => controller.setDefaultView());
  }

  _removeMovies() {
    this._moviesControllers.forEach((movieController) => movieController.destroy());
    this._moviesControllers = [];
  }

  _onFilterChange() {
    this._removeMovies();
    this._visibledCards = ONE_RENDER_QUANTITY;
    this._renderFilmsList(this._moviesModel.getMovies().slice(0, ONE_RENDER_QUANTITY));
    this._renderFilmsExtra();
  }

  _onLoadMoreButtonClick() {
    const prevMoviesCount = this._visibledCards;
    const movies = this._moviesModel.getMovies();

    this._visibledCards = this._visibledCards + ONE_RENDER_QUANTITY;

    this._renderFilmsList(movies.slice(prevMoviesCount, this._visibledCards));

    if (!this._isLoadMore()) {
      this._hasLoadButton = false;
      remove(this._loadMoreButtonComponent);
    }
  }
}
