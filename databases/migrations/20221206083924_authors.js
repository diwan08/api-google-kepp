/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("authors", t =>{
    t.increments("id");
    t.string("name", 50).notNullable();
    t.dateTime("birthdate").notNullable();
    t.enum("gender",["L","P"]).notNullable();
    t.text("address").notNullable();
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("authors");
};
