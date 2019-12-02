import {createFilmCard} from './film-card.js';
import {createShowMoreButton} from './show-more-button.js';
import {filmsToRender, topRatedFilms, mostCommentedFilms} from '../main.js';

export const createFilmsContainer = () => {
  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
      ${filmsToRender.map((film) => createFilmCard(film)).join(``)}
    </div>
    ${createShowMoreButton()}
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
      ${topRatedFilms.map((film) => createFilmCard(film)).join(``)}
    </div>
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
      ${mostCommentedFilms.map((film) => createFilmCard(film)).join(``)}
    </div>
  </section>
  </section>`);
};

export const createAdditionalBlock = () => {
  return `${filmsToRender.map((film) => createFilmCard(film)).join(``)}`;
};
