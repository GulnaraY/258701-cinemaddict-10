import {createFilmCard} from './film-card.js';
import {createShowMoreButton} from './show-more-button.js';
import {generateTasks} from '../mock/film-data.js';


const FILM_COUNT_MAIN = 5;
const FILM_COUNT_TOP_RATED = 2;
const FILM_COUNT_MOST_COMMENTED = 2;

export const createFilmsContainer = () => {
  return (`<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
      ${generateTasks(FILM_COUNT_MAIN).map((film) => createFilmCard(film)).join(``)}
    </div>
    ${createShowMoreButton()}
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container">
      ${generateTasks(FILM_COUNT_TOP_RATED).map((film) => createFilmCard(film)).join(``)}
    </div>
  </section>
  <section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
      ${generateTasks(FILM_COUNT_MOST_COMMENTED).map((film) => createFilmCard(film)).join(``)}
    </div>
  </section>
  </section>`);
};
