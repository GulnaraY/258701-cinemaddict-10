import {createUserProfile} from './components/user.js';
import {createMainNavigation} from './components/navigation.js';
import {createSortingBlock} from './components/sorting.js';
import {createFilmsContainer} from './components/films-container.js';
// import {createPopup} from './components/popup.js';

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
// const siteFooterElement = document.querySelector(`.footer`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfile());
render(siteMainElement, createMainNavigation());
render(siteMainElement, createSortingBlock());
render(siteMainElement, createFilmsContainer());
// render(siteFooterElement, createPopup(), `afterend`);
