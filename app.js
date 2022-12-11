require("dotenv").config();

const express = require("express")
const morgan = require("morgan")


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

app.use(require("./app/routes"))

app.use(require("./app/middlewares/errorhandle"))


app.listen(process.env.PORT, () => console.log("server running in port 3000"))