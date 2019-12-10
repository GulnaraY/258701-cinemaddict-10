/** Модуль для создания компонента футера страницы*/

import {totalAmount} from '../main.js';
import AbstractComponent from './abstract-component.js';

/** Класс для создания компонента Футера сайта */
export default class Footer extends AbstractComponent {
  constructor() {
    super();
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
}
