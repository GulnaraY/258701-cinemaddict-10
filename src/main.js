/** Основной модуль. Точка входа */

import {generateFilters} from './mock/filter-data.js';
import {render} from './utils/render.js';
import FooterComponent from './components/footer.js';
import NavigationCopmonent from './components/navigation.js';
import SortingComponent from './components/sorting.js';
import UserComponent from './components/user.js';
import {generateDetailInfo} from './mock/film-data.js';
import PageController from './controllers/page.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const films = generateDetailInfo();

render(siteHeaderElement, new UserComponent());
render(siteMainElement, new NavigationCopmonent(generateFilters(films)));
render(siteMainElement, new SortingComponent());

const totalAmount = films.length;

new PageController(siteMainElement).render(films);
render(siteMainElement, new FooterComponent());

export {totalAmount};
