const controller = require("../controller/author.controller")
const routes = require("express").Router()

// get data
routes.get("/", controller.getAll)
routes.get("/:id", controller.getDetail)
// create data
routes.post("/", controller.createAuth)

// update data
routes.put("/:id", controller.update)
// delete data
routes.delete("/:id", controller.delete)


module.exports = routes;