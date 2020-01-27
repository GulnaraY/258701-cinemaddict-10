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

export default class Statistic extends AbstractSmartComponent {
  constructor(watchedFilms) {
    super();
    this._films = watchedFilms;
    this._chart = null;
    this._renderCharts();
  }

  getTemplate() {
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
          value="${statName.toLowerCase().replace(`_`, `-`)}" checked>
          <label for="statistic-${statName.toLowerCase().replace(`_`, `-`)}" class="statistic__filters-label">${StatisticMap[statName]}</label>`).join(``)}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
  <p class="statistic__item-text">${this._films.length}<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${moment(this._getDuration()).format(`hh`)} <span class="statistic__item-description">h</span> ${moment(this._getDuration()).format(`mm`)} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${this._getSortedGenres()[0]}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`;
  }

  _getDuration() {
    return this._films.reduce((x, y) => (moment.utc(x.runTime) + moment.utc(y.runTime)));
  }

  _renderCharts() {
    const element = this.getElement();

    const ctx = element.querySelector(`.statistic__chart`);

    this._chart = this.renderChart(ctx);
  }

  _getFilmsQuantityByGenre(genre) {
    return this._films.filter((film) => film.genres.find((elem) => elem === genre)).length;
  }

  _getSortedGenres() {
    const genreSet = new Set();
    this._films.map((films) => films.genres.forEach((genre) => genreSet.add(genre)));
    return Array.from(genreSet).sort((a, b) => this._getFilmsQuantityByGenre(b) - this._getFilmsQuantityByGenre(a));
  }

  renderChart(ctx) {
    const genres = this._getSortedGenres();
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: genres,
        datasets: [{
          data: genres.map((genre) => this._getFilmsQuantityByGenre(genre)),
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
