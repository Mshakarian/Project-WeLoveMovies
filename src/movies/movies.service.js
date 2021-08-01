const knex = require("../db/connection");

// function list() {
//   return knex("movies").select("*");
// }

// function listMoviesShowing() {
//   return knex("movies as m")
//     .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
//     .select("m.*")
//     .where({ "mt.is_showing": true });
// }

function list(is_showing) {
  return knex("movies")
    .select("movies.*")
    .modify((queryBuilder) => {
      if (is_showing) {
        queryBuilder
          .join(
            "movies_theaters",
            "movies.movie_id",
            "movies_theaters.movie_id"
          )
          .where({ "movies_theaters.is_showing": true })
          .groupBy("movies.movie_id");
      }
    });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

async function reviewsByMovieId(movieId) {
  const reviewsForMovies = await knex("reviews")
    .select("*")
    .where({ movie_id: movieId });
  const criticsInfo = reviewsForMovies.map((movie) => {
    return knex("critics")
      .select("*")
      .where({ critic_id: movie.critic_id })
      .then((oneCritic) => {
        movie.critic = oneCritic[0];
        return movie;
      });
  });
  const allCriticsForMovieReviews = Promise.all(criticsInfo);
  return await allCriticsForMovieReviews;
}

module.exports = {
  list,
  read,
  //listMoviesShowing,
  reviewsByMovieId,
};
