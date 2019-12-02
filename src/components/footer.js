import {totalAmount} from '../main.js';
export const createFooter = () => {
  return `<footer class="footer">
  <section class="footer__logo logo logo--smaller">Cinemaddict</section>
  <section class="footer__statistics">
    <p>${totalAmount} movies inside</p>
  </section>
</footer>`;
};
