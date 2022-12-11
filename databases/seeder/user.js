const bcrypt  = require("bcrypt")

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
    id: require("crypto").randomUUID(),
    email:"diwan123@gmail.com",
    password: bcrypt.hashSync("diwan081001", 10),
    role: "admin"
  },
   
  ]);
};
