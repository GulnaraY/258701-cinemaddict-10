import {createUserProfile} from './components/user.js';
import {createMainNavigation} from './components/navigation.js';
import {createSortingBlock} from './components/sorting.js';
import {createFilmsContainer, createAdditionalBlock} from './components/films-container.js';
import {generateFilms} from './mock/film-data.js';
import {createFooter} from './components/footer.js';
import {generateFilters} from './mock/filter-data.js';
import {createPopup} from './components/popup.js';
import {getDetailInfo} from './mock/popup-data.js';
import {render} from './util.js';

const ONE_RENDER_QUANTITY = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms();
const totalAmount = films.length;
const renderingFilms = [...films];

let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

render(siteHeaderElement, createUserProfile());
render(siteMainElement, createMainNavigation(generateFilters()));
render(siteMainElement, createSortingBlock());
render(siteMainElement, createFilmsContainer());
render(siteMainElement, createFooter(), `afterend`);
const filmsContainer = siteMainElement.querySelector(`.films-list__container`);
const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, createPopup(getDetailInfo()), `afterend`);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

const onLoadMoreClick = () => {

  if (renderingFilms.length) {
    filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
    render(filmsContainer, createAdditionalBlock(filmsToRender));
  } else if (!renderingFilms.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreClick);

export {totalAmount, filmsToRender, films};
