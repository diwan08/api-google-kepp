const controller = require("../controller/user.controller")
const routes = require("express").Router()


// get data
routes.get("/", controller.getAll)
routes.get("/:id", controller.getDetail)
// create data
routes.post("/",controller.createUser)
// update data
routes.put("/:id",controller.update)
// delete data
routes.delete("/:id", controller.delete)



module.exports= routes;