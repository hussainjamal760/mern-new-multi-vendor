const  express = require("express")
const dotenv = require("dotenv")
const ErrorHandler = require ( "./utils/errorHandler.js")
const cookieParser = require ( "cookie-parser")
const userController = require("./controllers/userController.js")
const cors = require("cors")
const app =express()
const errorMiddleware = require("./middleware/error.js")

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/" , express.static("uploads"))
app.use(cors())


if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

app.use("/api/v2/user" ,userController )


app.use(errorMiddleware)



module.exports =  app