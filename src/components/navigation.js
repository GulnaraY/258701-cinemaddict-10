/**
 * Модуль для создания экземппляра класса для основной навигации
 */

import {createElement} from '../util.js';

/**
 * метод для создания разметки навигации
 * @param {object} filter
 * @param {Boolean} isChecked
 * @param {Boolean} isStats
 * @return {String} разметка навигации
 */
const createFilterMarkup = (filter, isChecked, isStats) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item
  ${isChecked ? `main-navigation__item--active` : ``}
  ${isStats ? `main-navigation__item--additional` : ``}">${name}
  ${isChecked || isStats ? `` : `<span class="main-navigation__item-count">${count}</span>`}
   </a>`;
};

/**
 * Класс для создания компонента основной навигаци
 */
export default class Navigation {
  constructor() {
    this._element = null;
  }

  getTemplate(filters) {
    return (`<nav class="main-navigation">
        ${filters.map((filter, i) => createFilterMarkup(filter, i === 0, i === filters.length - 1)).join(``)}
      </nav>`);
  }

  getElement(filters) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filters));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
