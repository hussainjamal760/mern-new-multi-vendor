const  express = require("express")
const dotenv = require("dotenv")
const ErrorHandler = require ( "./utils/errorHandler.js")
const cookieParser = require ( "cookie-parser")
const app =express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}
app.use(ErrorHandler)



module.exports =  app