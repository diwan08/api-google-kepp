const routes = require("express").Router()

const authorize= require("../middlewares/authorize")


routes.use("/v1/auth", require("./auth"));
routes.use("/v1/users",authorize, require("./users"));
routes.use("/v1/category",authorize, require("./category"))
routes.use("/v1/author",authorize, require("./authors"))
routes.use("/v1/book",authorize, require("./book"))


module.exports = routes;