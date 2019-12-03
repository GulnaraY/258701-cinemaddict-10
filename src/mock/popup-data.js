import {titles, genres, descriptionParts, posters} from '../mock/data.js';
import {getRandomElement, getRandomPart, getRandomFloatNumber, getRandomNumber, getRandomBoolean} from '../util.js';

const DESCRIPTION_MIN = 1;
const DESCRIPTION_MAX = 3;
const ACTORS_MIN_QUANTITY = 1;
const ACTORS_MAX_QUANTITY = 3;
const WRITERS_MIN_QUANTITY = 1;
const WRITERS_MAX_QUANTITY = 2;
const GENRE_MIN_QUANTITY = 1;
const GENRE_MAX_QUANTITY = 3;
const MAX_RATING = 10;
const EARLIES_RELEASE = 0;
const LATEST_RELEASE = Date.now();
const MIN_DURATION = 20;
const MAX_DURATION = 180;
const MIN_IN_HOUR = 60;
const EARLIEST_COMMENTING_DATE = Date.parse(new Date(`2016-01-01`));
const LATEST_COMMENTING_DATE = Date.now();
const MAX_COMMENT_QUANTITTY = 5;

const directors = [
  `David Fincher`,
  `Martin Scorseze`,
  `Pablo Almodovar`,
  `Quentin Tarantino`
];

const writers = [
  `Ethan Coen`,
  `Quentin Tarantino`,
  `Francis Coppola`,
];

const actors = [
  `Leonardo DiCaprio`,
  `Margot Roby`,
  `Brad Pit`,
  `Jennifer Aniston`,
  `Lena Headey`,
];

const ages = new Set([
  `7`,
  `13`,
  `16`,
  `18`,
]);

const countries = new Set([
  `Russia`,
  `USA`,
  `England`,
  `France`,
  `Italy`,
]);

const duration = getRandomNumber(MAX_DURATION, MIN_DURATION);

const userNames = [
  `Tim Macoveev`,
  `John Doe`,
  `John Snow`,
  `Tim Cook`,
];

const reactions = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`,
];

const commentTexts = [
  `awful`,
  `great`,
  `amazing`,
  `booring`,
  `briliant`,
];

const generateComment = () => ({
  name: getRandomElement(userNames),
  reaction: getRandomElement(reactions),
  text: getRandomElement(commentTexts),
  date: new Date(getRandomNumber(LATEST_COMMENTING_DATE, EARLIEST_COMMENTING_DATE)).toDateString(),
});

export const getDetailInfo = () => ({
  title: getRandomElement(titles),
  description: getRandomPart(descriptionParts, DESCRIPTION_MIN, DESCRIPTION_MAX),
  poster: getRandomElement(posters),
  director: getRandomElement(directors),
  writers: getRandomPart(writers, WRITERS_MIN_QUANTITY, WRITERS_MAX_QUANTITY, `, `),
  actors: getRandomPart(actors, ACTORS_MIN_QUANTITY, ACTORS_MAX_QUANTITY, `, `),
  genres: getRandomPart(genres, GENRE_MIN_QUANTITY, GENRE_MAX_QUANTITY).split(` `),
  age: getRandomElement(ages),
  rating: getRandomFloatNumber(MAX_RATING),
  yourRating: getRandomFloatNumber(MAX_RATING),
  country: getRandomElement(countries),
  releaseDate: new Date(getRandomNumber(LATEST_RELEASE, EARLIES_RELEASE)).toDateString(),
  runTime: `${Math.trunc(duration / MIN_IN_HOUR)}h ${duration % MIN_IN_HOUR}m`,
  isWatched: getRandomBoolean(),
  isFavorite: getRandomBoolean(),
  isInWatchlist: getRandomBoolean(),
  comments: new Array(getRandomNumber(MAX_COMMENT_QUANTITTY)).fill(``).map(() => generateComment()),
});


