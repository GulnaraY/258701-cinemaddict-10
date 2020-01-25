/**
 * Модуль для абстрактного класса AbstractComponent
 */

import {createElement} from '../utils/render.js';

export const HIDDEN_CLASS = `visually-hidden`;
/**
 * Абстрактный класс, от которого наследуются компоненты
 */
export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  /**
   * @public
   * метод изменяется у потомков, использовать нельзя
   */
  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  /**
   * @public
   * формирует элемент на основе разметки
   * @return {String}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * @public
   * Удаляет ссылку на элемент
   */
  removeElement() {
    this._element = null;
  }
  /**
   * @public
   * скрывает элемент
   */
  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  /**
   * @public
   * показывает элемент
   */
  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

}
