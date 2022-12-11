const controller = require("../controller/book.controller")
const routes = require("express").Router()

// get data
routes.get("/", controller.getAll)
// create data
routes.post("/", controller.createBook)
// update data
routes.put("/:id", controller.updateBook)
// delete data
routes.delete("/:id", controller.deleteBook)



module.exports= routes 