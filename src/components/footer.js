/** Модуль для создания компонента футера страницы*/

import {totalAmount} from '../main.js';
import {createElement} from '../util.js';

/** Класс для создания компонента Футера сайта */
export default class Footer {
  constructor() {
    this._element = null;
    this._totalAmount = totalAmount;
  }

  getTemplate() {
    return `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        <p>${this._totalAmount} movies inside</p>
      </section>
    </footer>`;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
