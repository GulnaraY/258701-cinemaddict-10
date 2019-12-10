/** Модуль для создания класса для Блока пользователя */
import {getUserRating} from '../mock/user-data';
import AbstractComponent from './abstract-component.js';

/** Класс, описывающий блок пользователя */
export default class UserInfo extends AbstractComponent {
  constructor() {
    super();

    this._userRating = getUserRating();
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._userRating} films</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
  }
}
