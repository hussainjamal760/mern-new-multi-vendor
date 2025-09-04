const  express = require("express")
const dotenv = require("dotenv")
const app =express()

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

module.exports =  app