const knex = require("../db/connection");

const tableName = "reviews";


const read = (review_id) => {
    return knex(tableName).select("*").where({ review_id }).first();
}


const destroy = (review_id) => {
    return knex(tableName).where({ review_id }).del();
  }
module.exports = {
    read,
    delete: destroy,
};
