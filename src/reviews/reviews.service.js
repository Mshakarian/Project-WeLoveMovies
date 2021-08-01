const knex = require("../db/connection");

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function read(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).first();
}

function update(review) {
  return knex("reviews")
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => {
      return knex("critics")
        .select("*")
        .where({ critic_id: review.critic_id })
        .first();
    });
}

module.exports = {
  destroy,
  read,
  update,
};
