const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloatNumber = (max, min = 0) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(1));
};

const getRandomElement = (array) => {
  return array[getRandomNumber(array.length - 1)];
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getRandomPart = (array, minquantity, maxquantity) => {
  const quantity = getRandomNumber(maxquantity, minquantity);
  let resultString = ``;
  for (let i = 1; i <= quantity; i++) {
    resultString += getRandomElement(array);
  }
  return resultString;
};

export {getRandomNumber, getRandomBoolean, getRandomFloatNumber, getRandomPart, getRandomElement};
