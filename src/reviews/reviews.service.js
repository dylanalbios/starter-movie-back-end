const knex = require("../db/connection");

const tableName = "reviews";


const read = async (review_id) => {
    const review = await knex(tableName)
      .select("*")
      .where({ review_id })
      .first();
  
    if (!review) return null;
  
    const critic = await knex("critics")
      .select("*")
      .where({ critic_id: review.critic_id })
      .first();
  
    return { ...review, critic };
};

const destroy = (review_id) => {
    return knex(tableName).where({ review_id }).del();
};

const update = async (updatedReview) => {
    const review_id = updatedReview.review_id;
  
    const existingReview = await knex(tableName)
        .select("*")
        .where({ review_id })
        .first();
  
    if (!existingReview) return null;
  
    await knex(tableName)
        .where({ review_id })
        .update(updatedReview);
  
    const updatedReviewWithCritic = await read(review_id);
  
    return updatedReviewWithCritic;
};
  


module.exports = {
    read,
    delete: destroy,
    update,
};
