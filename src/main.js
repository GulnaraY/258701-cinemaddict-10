/** Основной модуль. Точка входа */

import {generateFilters} from './mock/filter-data.js';
import {render} from './utils/render.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import UserComponent from './components/user.js';
import MoviesModel from './models/movies.js';
import {generateDetailInfo} from './mock/film-data.js';
import PageController from './controllers/page.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateDetailInfo();
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

render(siteHeaderElement, new UserComponent());
render(siteMainElement, new NavigationCopmonent(generateFilters(films)));

const totalAmount = films.length;

new PageController(siteMainElement, moviesModel).render();
render(siteMainElement, new FooterComponent());

export {totalAmount};
