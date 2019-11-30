const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 3;
const MAX_RATING = 10;
const EARLIEST_YEAR = 1900;
const LATEST_YEAR = 2019;
const MIN_DURATION = 20;
const MAX_DURATION = 180;
const MAX_COMMENTS_QUANTITY = 20;

const titles = new Set([
  `Friends`,
  `The Big Bang Theory`,
  `Revolutionary Road`,
  `The social network`,
  `The green mile`,
  `The Great Gatsby`,
  `Star Wars`,
  `Leon`,
  `Game of Trones`,
  `The Matrix`,
  `Forrest Gamp`,
  `A beautiful mind`,
  `Harry Potter`,
  `Frozen`,
  `Lalaland`,
]);

const descriptionParts = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const genres = new Set([
  `comedy`,
  `drama`,
  `cartoon`,
  `horror`,
  `TVshow`,
]);

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gerRandomFloatNumber = (max, min = 0) => {
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

export const generateTask = () => {
  return {
    title: getRandomElement(Array.from(titles)),
    description: getRandomPart(descriptionParts, DESCRIPTION_MIN, DESCRIPTION_MAX),
    poster: getRandomElement(posters),
    genre: getRandomElement(Array.from(genres)),
    isWatched: getRandomBoolean(),
    isInWatchlist: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    rating: gerRandomFloatNumber(MAX_RATING),
    year: getRandomNumber(LATEST_YEAR, EARLIEST_YEAR),
    duration: `${getRandomNumber(MAX_DURATION, MIN_DURATION)}m`,
    comments: getRandomNumber(MAX_COMMENTS_QUANTITY),
  };
};

export const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};
