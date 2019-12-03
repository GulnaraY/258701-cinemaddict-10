import {getRandomBoolean, getRandomElement, getRandomNumber, getRandomPart, getRandomFloatNumber} from '../util.js';
import {titles, descriptionParts, posters, genres} from './data.js';

const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 3;
const MAX_RATING = 10;
const EARLIEST_YEAR = 1970;
const LATEST_YEAR = 2019;
const MIN_DURATION = 20;
const MAX_DURATION = 180;
const MAX_COMMENTS_QUANTITY = 5;

export const generateFilm = () => {
  return {
    title: getRandomElement(titles),
    description: getRandomPart(descriptionParts, DESCRIPTION_MIN, DESCRIPTION_MAX),
    poster: getRandomElement(posters),
    genre: getRandomElement(genres),
    isWatched: getRandomBoolean(),
    isInWatchlist: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    rating: getRandomFloatNumber(MAX_RATING),
    year: getRandomNumber(LATEST_YEAR, EARLIEST_YEAR),
    duration: `${getRandomNumber(MAX_DURATION, MIN_DURATION)}m`,
    comments: getRandomNumber(MAX_COMMENTS_QUANTITY),
  };
};

export const generateFilms = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateFilm);
};


