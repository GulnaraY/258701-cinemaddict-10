/** Модуль для создания экземпляра класса ShowMoreButton */
import {createElement} from '../util.js';

/** Класс, описывающий кнопку ShowMore */
export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  removeElement() {
    this._element = null;
  }
}
