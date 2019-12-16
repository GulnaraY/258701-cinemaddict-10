/**
 * Модуль для генерации данных для попапа(детальная информация о фильме)
 * @exports getDetailInfo
 */
import {getRandomElement, getRandomPart, getRandomFloatNumber, getRandomNumber, getRandomBoolean} from '../utils/util.js';

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
const FILM_COUNT = 7;

const titles = [
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
];

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
  `mystery`,
  `film-noir`,
  `biografy`
]);

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

/**
* Генерирует объект с детальной информацией о фильме
* @return {Object} - моки с детальной инфой о фильме
*/
export const getDetailInfo = () => {
  const duration = getRandomNumber(MAX_DURATION, MIN_DURATION);
  return {
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
  };
};

/**
 *Генерирует необходимое количество моковых данных для карточек фильмов и попапов
 * @return {Array} массив содержащий объкты с данными по фильмам
 */
export const generateDetailInfo = () => {

  return new Array(FILM_COUNT)
  .fill(``)
  .map(getDetailInfo);
};


