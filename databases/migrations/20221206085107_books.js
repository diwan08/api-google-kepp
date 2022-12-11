/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("books", t =>{
    t.increments("books_id");
    t.string("title", 100).notNullable();
    t.text("description").notNullable();
    t.string("publisher", 50).notNullable();
    t.date("publish_at").notNullable();
    t.integer("author_id").unsigned().notNullable();
    t.foreign("author_id").references().inTable("authors").onDelete("CASCADE");
    t.integer("category_id").unsigned().notNullable();
    t.foreign("category_id").references().inTable("categories").onDelete("CASCADE");
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("books");
};
