/**
 * Модуль со служебными функциями
 */

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

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export {getRandomNumber, getRandomBoolean, getRandomFloatNumber, getRandomPart, getRandomElement, render};
