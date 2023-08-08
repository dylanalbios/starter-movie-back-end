const knex = require("../db/connection");

const tableName = "movies";

function list(isShowing) {
    let query = knex(tableName).select("*");

    if (isShowing) {
        query = query
            .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
            .where({ "movies_theaters.is_showing": true })
            .groupBy("movies.movie_id");
    }
    return query;
};

function read(movie_id) {
    return knex(tableName).select("*").where({ movie_id }).first();
};

module.exports = {
    list,
    read,
};