
exports.up = function(knex) {
  return knex.schema.createTable("movies-theaters", (table) => {
    table.increments("movies-theaters_id").primary();
    table.boolean("is_showing");
    table.integer("theater_id").unsigned().notNullable();
    table
        .foreign("theater_id")
        .references("theater_id")
        .inTable("theaters")
        .onDelete("CASCADE");

    table.integer("movie_id").unsigned().notNullable();
    table
        .foreign("movie_id")
        .references("movie_id")
        .inTable("movies")
        .onDelete("CASCADE");
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies-theaters");
};
