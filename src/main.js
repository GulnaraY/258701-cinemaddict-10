/** Основной модуль. Точка входа */

import {render} from './utils/render.js';
import FooterComponent from './components/footer.js';
import FilterController from './controllers/filter.js';
import UserComponent from './components/user.js';
import MoviesModel from './models/movies.js';
import {generateDetailInfo} from './mock/film-data.js';
import PageController from './controllers/page.js';
import StatisticComponent from './components/statistic.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateDetailInfo();
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

render(siteHeaderElement, new UserComponent());
const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const totalAmount = films.length;

const pageController = new PageController(siteMainElement, moviesModel);
pageController.render();

const statisticComponent = new StatisticComponent();
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
render(siteMainElement, new FooterComponent());

export {totalAmount};
