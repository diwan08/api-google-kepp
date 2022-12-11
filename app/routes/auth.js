const routes = require ("express").Router();

// controller
const controller = require("../controller/auth.controller");
// route login
routes.post("/login", controller.createLogin);

module.exports = routes;