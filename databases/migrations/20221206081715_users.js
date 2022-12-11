/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", t =>{
    t.string("id", 50).primary();
    t.string("name", 50).notNullable();
    t.dateTime("birthdate").notNullable();
    t.string("no_telp", 15).notNullable();
    t.text("address").notNullable();
    t.string("email", 50).unique().notNullable();
    t.string("password").notNullable();
    t.enum("role",["admin","member"]).notNullable();
    t.string("image", 100);
    t.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
