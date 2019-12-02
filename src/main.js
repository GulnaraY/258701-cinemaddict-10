import {createUserProfile} from './components/user.js';
import {createMainNavigation} from './components/navigation.js';
import {createSortingBlock} from './components/sorting.js';
import {createFilmsContainer, createAdditionalBlock} from './components/films-container.js';
import {generateFilms} from './mock/film-data.js';
import {createFooter} from './components/footer.js';
import {generateFilters} from './mock/filter-data.js';
import {createPopup} from './components/popup.js';
import {getDetailInfo} from './mock/popup-data.js';

const FILM_COUNT = 22;
const ONE_RENDER_QUANTITY = 5;
const TOP_RATED_QUANTITY = 2;
const MOST_COMMENTED_QUANTITY = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilms(FILM_COUNT);
const totalAmount = films.length;
const renderingFilms = [...films];

let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
const topRatedFilms = [...films].sort((a, b) => {
  if (a.rating < b.rating) {
    return 1;
  } else if (a.rating > b.rating) {
    return -1;
  }
  return 0;
}
).splice(0, TOP_RATED_QUANTITY);

const mostCommentedFilms = [...films].sort((a, b) => {
  if (a.comments < b.comments) {
    return 1;
  } else if (a.comments > b.comments) {
    return -1;
  }
  return 0;
}
).splice(0, MOST_COMMENTED_QUANTITY);

const getFilmsCount = (filterValue) => {
  return [...films].filter((film) => film[filterValue]).length;
};

render(siteHeaderElement, createUserProfile());
render(siteMainElement, createMainNavigation(generateFilters()));
render(siteMainElement, createSortingBlock());
render(siteMainElement, createFilmsContainer());
render(siteMainElement, createFooter(), `afterend`);

const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createPopup(getDetailInfo()), `afterend`);


const loadMoreButton = document.querySelector(`.films-list__show-more`);

const onLoadMoreClick = () => {
  const filmsContainer = siteMainElement.querySelector(`.films-list__container`);
  if (renderingFilms.length) {
    filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
    render(filmsContainer, createAdditionalBlock());
  }
  if (!renderingFilms.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreClick);

export {totalAmount, filmsToRender, topRatedFilms, mostCommentedFilms, getFilmsCount};
