/** Модуль для создания экземпляра класса для блока Сортировки */
import AbstractComponent from './abstract-component.js';

export const SortMap = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const ClassMap = {
  SIMPLE: `sort__button`,
  ACTIVE: `sort__button--active`,
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

      this._removeActiveClass();

      this._currentSortType = sortType;
      document.querySelector(`[data-sort-type=${sortType}]`).classList.add(ClassMap.ACTIVE);

      handler(this._currentSortType);
    });
  }

  /**
   * Удаление текущего активного класса
   * @private
   */
  _removeActiveClass() {
    const sortingElements = document.querySelectorAll(`.${ClassMap.SIMPLE}`);
    Array.from(sortingElements).forEach((element) => {
      if (element.classList.contains(ClassMap.ACTIVE)) {
        element.classList.remove(ClassMap.ACTIVE);
      }
    });
  }
}
