/** Основной модуль. Точка входа */

import {generateFilters} from './mock/filter-data.js';
import {render} from './utils/render.js';
import FilmsContainerComponent from './components/films-container.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import SortingComponent from './components/sorting.js';
import UserComponent from './components/user.js';
import PopupComponent from './components/popup.js';
import FilmCardComponent from './components/film-card.js';
import ShowMoreButtonComponent from './components/show-more-button.js';
import {unrender} from './utils/render.js';
import {generateDetailInfo} from './mock/film-data.js';
import {getSortedItems} from './filters.js';
import {ESC_CODE} from './utils/util.js';
import NoFilmsComponent from './components/no-films.js';

const ONE_RENDER_QUANTITY = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const films = generateDetailInfo();

render(siteHeaderElement, new UserComponent());
render(siteMainElement, new NavigationCopmonent(generateFilters(films)));
render(siteMainElement, new SortingComponent());

/**
* Рендерит карточки фильмов, по ходу навешивая обработчики событий
* @param {Object} film - объект с данными по фильм
* @param {Object} container - дом нода в которую рендерим элемент
*/
const renderFilm = (film, container) => {
  const filmCard = new FilmCardComponent(film);
  const filmCardElement = filmCard.getElement();
  const filmPopup = new PopupComponent(film);

  const onPopupEscPress = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      document.removeEventListener(`keydown`, onPopupEscPress);
      unrender(filmPopup);
    }
  };

  const addClosePopupListener = () => {
    filmPopup.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, () => {
      document.removeEventListener(`keydown`, onPopupEscPress);
      unrender(filmPopup);
    });

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  filmCardElement
  .querySelector(`.film-card__title`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup);
    addClosePopupListener();
  });

  filmCardElement
  .querySelector(`.film-card__poster`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup);
    addClosePopupListener();
  });

  filmCardElement
  .querySelector(`.film-card__comments`)
  .addEventListener(`click`, () => {
    render(bodyElement, filmPopup);
    addClosePopupListener();
  });

  filmPopup.getElement()
  .querySelector(`.film-details__close-btn`)
  .addEventListener(`click`, () => {
    unrender(filmPopup);
  });

  render(container, filmCard);
};

const renderFilmData = (total) => {
  if (!total) {
    render(siteMainElement, new NoFilmsComponent());
  } else {

    const renderingFilms = [...films];
    let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

    const showMoreButton = new ShowMoreButtonComponent();
    render(siteMainElement, new FilmsContainerComponent(showMoreButton));
    const filmsContainer = siteMainElement.querySelector(`.films-list .films-list__container`);
    const addBlockRenderPlace = siteMainElement.querySelectorAll(`.films-list--extra .films-list__container`);

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
      renderFilm(film, renderData[key].place);
    }));

    const loadMoreButton = document.querySelector(`.films-list__show-more`);

    /** Обработчик нажатия на кнопку show more */
    const onLoadMoreClick = () => {
      if (renderingFilms.length) {
        filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
        filmsToRender.map((film) => renderFilm(film, filmsContainer));
      }

      if (!renderingFilms.length) {
        unrender(showMoreButton);
      }
    };

    loadMoreButton.addEventListener(`click`, onLoadMoreClick);
  }
};

const totalAmount = films.length;

renderFilmData(totalAmount);

render(siteMainElement, new FooterComponent());

export {totalAmount};
