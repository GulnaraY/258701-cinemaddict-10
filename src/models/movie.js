export default class Movie {
  constructor(data) {
    this.id = data.id;
    this._filmInfo = data[`film_info`];
    this._userInfo = data[`user_details`];
    this.title = this._filmInfo.title;
    this.alternativeTitle = this._filmInfo.alternative_title;
    this.description = this._filmInfo.description;
    this.poster = this._filmInfo.poster;
    this.director = this._filmInfo.director;
    this.writers = this._filmInfo.writers;
    this.actors = this._filmInfo.actors;
    this.genres = this._filmInfo.genre;
    this.age = data.film_info[`age_rating`];
    this.rating = data.film_info[`total_rating`];
    this.yourRating = this._userInfo[`personal_rating`];
    this.country = this._filmInfo.release[`release_country`];
    this.releaseDate = this._filmInfo.release.date;
    this.runTime = this._filmInfo.runtime;
    this.isWatched = this._userInfo[`already_watched`];
    this.isFavorite = this._userInfo.favorite;
    this.isInWatchlist = this._userInfo.watchlist;
    this.comments = data.comments;
    this.watchedDate = this._userInfo[`watching_date`];
  }

  toRAW() {
    return {
      [`user_details`]: {
        [`already_watched`]: this.isWatched,
        [`favorite`]: this.isFavorite,
        [`watchlist`]: this.isInWatchlist,
        [`watching_date`]: this.watchedDate,
        [`personal_rating`]: this.yourRating,
      },
      [`comments`]: this.comments,
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }

}
