import {createUserProfile} from './components/user.js';
import {createMainNavigation} from './components/navigation.js';
import {createSortingBlock} from './components/sorting.js';
import {createFilmsContainer, createAdditionalBlock} from './components/films-container.js';
import {generateFilms} from './mock/film-data.js';
import {createFooter} from './components/footer.js';
import {generateFilters} from './mock/filter-data.js';
import {createPopup} from './components/popup.js';
import {getDetailInfo} from './mock/popup-data.js';
import {render, RenderPosition} from './util.js';
import FilmsContainerComponent from './components/films-container.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import SortingComponent from './components/sorting.js';
import UserComponent from './components/user.js';
import PopupComponent from './components/popup.js';

const FILM_COUNT = 22;
const ONE_RENDER_QUANTITY = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateFilms(FILM_COUNT);
const totalAmount = films.length;
const renderingFilms = [...films];

let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

render(siteHeaderElement, new UserComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new NavigationCopmonent().getElement(generateFilters()));
render(siteMainElement, new SortingComponent().getElement());
render(siteMainElement, new FilmsContainerComponent().getElement());
render(siteMainElement, new FooterComponent().getElement(), RenderPosition.AFTERBEGIN);
const filmsContainer = siteMainElement.querySelector(`.films-list__container`);
const siteFooterElement = document.querySelector(`.footer`);
render(siteFooterElement, new PopupComponent(getDetailInfo()).getElement(), RenderPosition.AFTERBEGIN);

const loadMoreButton = document.querySelector(`.films-list__show-more`);

const onLoadMoreClick = () => {

  if (renderingFilms.length) {
    filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
    render(filmsContainer, new FilmsContainerComponent().addRow(filmsToRender));
  } else if (!renderingFilms.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreClick);

export {totalAmount, filmsToRender, films};
