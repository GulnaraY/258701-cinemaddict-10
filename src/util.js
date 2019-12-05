/**
 * Модуль со служебными функциями
 */

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (max, min = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

const getRandomElement = (elements) => {
  if (!Array.isArray(elements)) {
    elements = Array.from(elements);
  }

  return elements[getRandomNumber(elements.length - 1)];
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getRandomPart = (elements, minquantity, maxquantity, divider = ` `) => {

  if (!Array.isArray(elements)) {
    elements = Array.from(elements);
  }
  const quantity = getRandomNumber(maxquantity, minquantity);
  const resultArray = [];
  for (let i = 1; i <= quantity; i++) {
    resultArray.push(getRandomElement(elements));
  }
  return resultArray.join(divider);
};

// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };

/**
 * Создает дом-элементы на основании разметки
 * @param {String} template - разметка
 * @return {Object} - созданный дом-элемент
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
/**
 * Рендеринг компонентов
 * @param {Oblect} container - ссылка на дом-ноду, в которую рендерим
 * @param {String} template - шаблон, который рендерим
 * @param {String} place - указывает на место в дом-ноде, в которое вставляем
 */
const render = (container, template, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(template);
      break;
    case RenderPosition.BEFOREEND:
      container.append(template);
      break;
  }
};

/**
 * Удаление элемента из ДОМ
 * @param {Object} element - ссылка на дом-ноду удаляемого объекта
 */
export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export {getRandomNumber, getRandomBoolean, getRandomFloatNumber, getRandomPart, getRandomElement, render};
