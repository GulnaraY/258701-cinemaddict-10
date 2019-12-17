/** Модуль для создания экземпляра класса ShowMoreButton */
import AbstractComponent from './abstract-component.js';

/** Класс, описывающий кнопку ShowMore */
export default class ShowMoreButton extends AbstractComponent {

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
