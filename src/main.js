/** Основной модуль. Точка входа */

import {generateFilters} from './mock/filter-data.js';
import {render} from './util.js';
import FilmsContainerComponent from './components/films-container.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import SortingComponent from './components/sorting.js';
import UserComponent from './components/user.js';
import PopupComponent from './components/popup.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import {unrender} from './util.js';
import {generateDetailInfo} from './mock/film-data.js';
import {getSortedItems} from './filters.js';

const FILM_COUNT = 18;
const ONE_RENDER_QUANTITY = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const films = generateDetailInfo(FILM_COUNT);
const totalAmount = films.length;
const renderingFilms = [...films];
let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

render(siteHeaderElement, new UserComponent().getElement());
render(siteMainElement, new NavigationCopmonent().getElement(generateFilters(films)));
render(siteMainElement, new SortingComponent().getElement());

const showMoreButton = new ShowMoreButtonComponent();
render(siteMainElement, new FilmsContainerComponent(showMoreButton).getElement());
const filmsContainer = siteMainElement.querySelector(`.films-list .films-list__container`);

const renderData = {
  randomFilms: {
    data: filmsToRender,
    place: filmsContainer
  },
  topRatedFilms: {
    data: getSortedItems(films, `rating`),
    place: siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[0],
  },
  mostCommentedFilms: {
    data: getSortedItems(films, `comments`),
    place: siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`)[1],
  }
};

/**
 * Рендерит карточки фильмов, по ходу навешивая обработчики событий
 * @param {Object} film - объект с данными по фильм
 * @param {Object} container - дом нода в которую рендерим элемент
 */
const renderFilm = (film, container) => {
  const filmCard = new FilmCardComponent(film).getElement();
  const filmPopup = new PopupComponent(film);

  filmCard
  .querySelector(`.film-card__title`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup.getElement());
  });

  filmCard
  .querySelector(`.film-card__poster`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup.getElement());
  });

  filmCard
  .querySelector(`.film-card__comments`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup.getElement());
  });

  filmPopup.getElement()
  .querySelector(`.film-details__close-btn`)
  .addEventListener(`click`, () => {
    filmPopup.removeElement();
    const popupNode = document.querySelector(`.film-details`);
    unrender(popupNode);
  });
  render(container, filmCard);
};

Object.keys(renderData).map((key) => renderData[key].data.forEach((film) => {
  renderFilm(film, renderData[key].place);
}));

render(siteMainElement, new FooterComponent().getElement());
const loadMoreButton = document.querySelector(`.films-list__show-more`);

/** Обработчик нажатия на кнопку show more */
const onLoadMoreClick = () => {
  if (renderingFilms.length) {
    filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
    filmsToRender.map((film) => renderFilm(film, filmsContainer));
  }

  if (!renderingFilms.length) {
    unrender(loadMoreButton);
    showMoreButton.removeElement();
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreClick);

export {totalAmount, filmsToRender, films};
