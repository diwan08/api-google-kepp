const controller = require("../controller/category.controller")
const routes = require("express").Router()

// get data
routes.get("/",controller.getAll)
routes.get("/:id", controller.getDetail)

// create data
routes.post("/",controller.create)

routes.put("/:id", controller.update)
routes.delete("/:id", controller.delete)









module.exports= routes;