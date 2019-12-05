import {getUserRating} from '../mock/user-data';
import {createElement} from '../util.js';
// export const createUserProfile = () => {
//   return (`<section class="header__profile profile">
//     <p class="profile__rating">${getUserRating()} films</p>
//     <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
//   </section>`
//   );
// };

export default class UserInfo {
  constructor() {
    this._element = null;
    this._userRating = getUserRating();
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._userRating} films</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
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
