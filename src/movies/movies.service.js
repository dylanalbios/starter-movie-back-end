const knex = require("../db/connection");

const tableName = "movies";

const list = (isShowing) => {
    let query = knex(tableName).select("*");

    if (isShowing) {
        query = query
            .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
            .where({ "movies_theaters.is_showing": true })
            .groupBy("movies.movie_id", "movies_theaters.movies-theaters_id");
    }
    return query;
};

const read = (movie_id) => {
    return knex(tableName).select("*").where({ movie_id }).first();
};

const theatersByMovieId = (movie_id) => {
    return knex("movies_theaters")
        .select("theaters.*")
        .join("theaters", "movies_theaters.theater_id", "theaters.theater_id")
        .where({ "movies_theaters.movie_id": movie_id });
};

const reviewsWithCriticByMovieId = async (movieId) => {
    try {
      const reviews = await knex("reviews as r")
        .select(
          "r.*",
          "c.preferred_name as critic_preferred_name",
          "c.surname as critic_surname",
          "c.organization_name as critic_organization_name"
        )
        .join("critics as c", "r.critic_id", "c.critic_id")
        .where("r.movie_id", movieId);
  
      return reviews.map((review) => ({
        ...review,
        critic: {
          preferred_name: review.critic_preferred_name,
          surname: review.critic_surname,
          organization_name: review.critic_organization_name,
        },
      }));
    } catch (error) {
      throw error;
    }
};
  
module.exports = {
    list,
    read,
    theatersByMovieId,
    reviewsWithCriticByMovieId,
};