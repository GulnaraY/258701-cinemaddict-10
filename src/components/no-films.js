/**
 * Модуль для генерации экземпляра класса для создания
 * компонент для отрисовки при отсутствии данных
 */

import AbstractComponent from './abstract-component.js';

/**
 * Класс для создания компонента для отрисовки
 * при отсутствии данных
 */
export default class NoFilms extends AbstractComponent {
  getTemplate() {
    return (`<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`);
  }
}
