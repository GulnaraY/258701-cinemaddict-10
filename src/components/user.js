import {generateUserInfo} from '../mock/user-data';

export const createUserProfile = () => {
  return (`<section class="header__profile profile">
    <p class="profile__rating">${generateUserInfo()} films</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};
