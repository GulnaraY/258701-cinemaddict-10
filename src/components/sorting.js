/** Модуль для создания экземпляра класса для блока Сортировки */
import AbstractComponent from './abstract-component.js';

export const SortMap = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

/** Класс, описывающий блок сортировки */
export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortMap.DEFAULT;
  }
  getTemplate() {
    return `<ul class="sort">
      <li><a href="#" data-sort-type="${SortMap.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortMap.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortMap.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }
      const sortingElements = document.querySelectorAll(`.sort__button`);
      Array.from(sortingElements).forEach((element) => {
        if (element.classList.contains(`sort__button--active`)) {
          element.classList.remove(`sort__button--active`);
        }
      });
      this._currentSortType = sortType;
      document.querySelector(`[data-sort-type=${sortType}]`).classList.add(`sort__button--active`);

      handler(this._currentSortType);
    });
  }
}
