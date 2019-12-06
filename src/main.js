import {generateFilms} from './mock/film-data.js';
import {generateFilters} from './mock/filter-data.js';
import {getDetailInfo} from './mock/popup-data.js';
import {render} from './util.js';
import FilmsContainerComponent from './components/films-container.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import SortingComponent from './components/sorting.js';
import UserComponent from './components/user.js';
import PopupComponent from './components/popup.js';
import FilmCardComponent from './components/film-card.js';

const FILM_COUNT = 22;
const ONE_RENDER_QUANTITY = 5;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);

const films = generateFilms(FILM_COUNT);
const totalAmount = films.length;
const renderingFilms = [...films];

let filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);

render(siteHeaderElement, new UserComponent().getElement());
render(siteMainElement, new NavigationCopmonent().getElement(generateFilters()));
render(siteMainElement, new SortingComponent().getElement());
render(siteMainElement, new FilmsContainerComponent().getElement());
render(siteMainElement, new FooterComponent().getElement());
const filmsContainer = siteMainElement.querySelector(`.films-list__container`);
render(bodyElement, new PopupComponent(getDetailInfo()).getElement());

const loadMoreButton = document.querySelector(`.films-list__show-more`);

const onLoadMoreClick = () => {

  if (renderingFilms.length) {
    filmsToRender = renderingFilms.splice(0, ONE_RENDER_QUANTITY);
    filmsToRender.map((film) => render(filmsContainer, new FilmCardComponent(film).getElement()));
  } else if (!renderingFilms.length) {
    loadMoreButton.remove();
  }
};

loadMoreButton.addEventListener(`click`, onLoadMoreClick);

export {totalAmount, filmsToRender, films};
