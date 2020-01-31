/** Основной модуль. Точка входа */
import API from './api.js';
import {render} from './utils/render.js';
import FooterComponent from './components/footer.js';
import FilterController from './controllers/filter.js';
import UserComponent from './components/user.js';
import MoviesModel from './models/movies.js';
import {generateDetailInfo} from './mock/film-data.js';
import PageController from './controllers/page.js';
import StatisticComponent from './components/statistic.js';

const AUTHORIZATION = `Basic WrR0fUVoaETOiMDnFU6W`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateDetailInfo();
const moviesModel = new MoviesModel();
// moviesModel.setMovies(films);

const pageController = new PageController(siteMainElement, moviesModel);

render(siteHeaderElement, new UserComponent());
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const totalAmount = films.length;

const statisticComponent = new StatisticComponent(moviesModel);
render(siteMainElement, statisticComponent);
statisticComponent.hide();

filterController.setOnChange((menuItem) => {
  if (menuItem.classList.contains(`main-navigation__item--additional`)) {
    statisticComponent.show();
    pageController.hide();
  } else {
    statisticComponent.hide();
    pageController.show();
  }
  filterController.setActiveItem(menuItem);
});

api.getMovies()
  .then((movies) => {

    moviesModel.setMovies(movies);
    return movies.map((movie) => movie.id);
  })
  .then((ids) => {
    return ids.map((filmId) => (api.getComments(filmId)));
  })
  .then((data) => {
    pageController.render();
    render(siteMainElement, new FooterComponent());
  });

export {totalAmount};
