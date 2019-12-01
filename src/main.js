import {createUserProfile} from './components/user.js';
import {createMainNavigation} from './components/navigation.js';
import {createSortingBlock} from './components/sorting.js';
import {createFilmsContainer} from './components/films-container.js';
import {generateFilms} from './mock/film-data.js';
// import {createPopup} from './components/popup.js';
// import {getDetailInfo} from './mock/popup-data.js';

const FILM_COUNT = 20;
const ONE_RENDER_QUANTITY = 5;
const TOP_RATED_QUANTITY = 2;
const MOST_COMMENTED_QUANTITY = 2;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
// const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const films = generateFilms(FILM_COUNT);
const renderingFilms = [...films];

export const filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
export const topRatedFilms = [...films].sort((a, b) => {
  if (a.rating < b.rating) {
    return 1;
  } else if (a.rating > b.rating) {
    return -1;
  }
  return 0;
}
).splice(0, TOP_RATED_QUANTITY);

export const mostCommentedFilms = [...films].sort((a, b) => {
  if (a.comments < b.comments) {
    return 1;
  } else if (a.comments > b.comments) {
    return -1;
  }
  return 0;
}
).splice(0, MOST_COMMENTED_QUANTITY);


render(siteHeaderElement, createUserProfile());
render(siteMainElement, createMainNavigation());
render(siteMainElement, createSortingBlock());
render(siteMainElement, createFilmsContainer());
// render(siteFooterElement, createPopup(getDetailInfo()), `afterend`);
