/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable("notes", t =>{
        t.string("id").primary();
        t.string('user_id').notNullable();
        t.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");
        t.string("title").notNullable();
        t.text("context").notNullable();
        t.timestamps(true,true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("notes");
};
