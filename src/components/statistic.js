import AbstractSmartComponent from './abstract-smart-component.js';
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getUserRating} from '../mock/user-data.js';

const chartColor = `#ffe800`;
const labelsColor = `#fff`;
const StatisticMap = {
  ALL_TIME: `All time`,
  TODAY: `Today`,
  WEEK: `Week`,
  MONTH: `Month`,
  YEAR: `Year`,
};

const StatisticRangeMap = {
  ALL_TIME: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`,
};

const RangeMap = {
  [`statistic-all-time`]: new Date(0),
  [`statistic-today`]: new Date(new Date().setHours(0, 0, 0)),
  [`statistic-week`]: new Date(new Date().setDate(new Date().getDate() - 7)),
  [`statistic-month`]: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  [`statistic-year`]: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
};

export default class Statistic extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._chart = null;
    this._currentFilter = StatisticRangeMap.ALL_TIME;
  }

  getTemplate() {
    const movies = this._getFilmsByPeriod(this._currentFilter);
    return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${getUserRating()}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${Object.keys(StatisticMap).map((statName) => `<input type="radio" class="statistic__filters-input visually-hidden"
          name="statistic-filter" id="statistic-${statName.toLowerCase().replace(`_`, `-`)}"
          value="${statName.toLowerCase().replace(`_`, `-`)}" ${this._currentFilter === `statistic-${statName.toLowerCase().replace(`_`, `-`)}` ? `checked` : `` }>
          <label for="statistic-${statName.toLowerCase().replace(`_`, `-`)}" class="statistic__filters-label">${StatisticMap[statName]}</label>`).join(``)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
  <p class="statistic__item-text">${movies.length}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${movies.length ? `${moment.utc(this._getDuration(movies)).format(`H`)} <span class="statistic__item-description">h</span> ${moment(this._getDuration(movies)).format(`mm`)} <span class="statistic__item-description">m</span>` : `-` }</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._getSortedGenres(movies)[0] ? this._getSortedGenres(movies)[0] : ``}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
  }

  show() {
    super.show();

    this.rerender();
    this._renderCharts();
  }

  recoveryListeners() {
    this._setStatisticPeriodHandler();
  }

  _getDuration(movies) {
    return new Date(movies.reduce((x = 0, y) => {
      return x + y.runTime;
    }, movies[0].runTime) - movies[0].runTime);
  }

  _renderCharts() {
    const moviesToChart = this._moviesModel.getMoviesAll().filter((movie) => movie.isWatched);
    this._chart = this._renderChart(moviesToChart);
  }

  _getFilmsQuantityByGenre(genre, filmsToQuantity) {
    return filmsToQuantity.filter((film) => film.genres.find((elem) => elem === genre)).length;
  }

  _getSortedGenres(filmsToSort) {
    const genreSet = new Set();
    filmsToSort.map((films) => films.genres.forEach((genre) => genreSet.add(genre)));

    return Array.from(genreSet).sort((a, b) => this._getFilmsQuantityByGenre(b, filmsToSort) - this._getFilmsQuantityByGenre(a, filmsToSort));
  }

  _setStatisticPeriodHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        const filmsByPeriod = this._getFilmsByPeriod(evt.target.id);
        this._currentFilter = evt.target.id;

        this.rerender();
        this._renderChart(filmsByPeriod);
      }
    });

  }

  _getFilmsByPeriod(id) {
    return this._moviesModel.getWatchedMovies().filter((film) => {
      return film.watchedDate >= RangeMap[id].getTime();
    });
  }

  _renderChart(filmsToChart) {
    const element = this.getElement();
    const ctx = element.querySelector(`.statistic__chart`);
    const genres = this._getSortedGenres(filmsToChart);

    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: genres,
        datasets: [{
          data: genres.map((genre) => this._getFilmsQuantityByGenre(genre, filmsToChart)),
          backgroundColor: chartColor,

        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false,
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: labelsColor,
              fontSize: 20,
              padding: 80,
              align: `right`,
            },
          }],
        },

        legend: {
          display: false,
          labels: {
            display: false,
          }
        },

        ticks: {
          display: false,
        },

        plugins: {
          datalabels: {
            color: labelsColor,
            offset: `25`,
            anchor: `start`,
            align: `left`,
            font: {
              weight: `normal`,
              size: `20`,
            },
          }
        },
      }
    });
  }
}
