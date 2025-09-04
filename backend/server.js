const dotenv = require("dotenv")
const app = require('./app.js')
const connectDatabase = require("./db/database.js")

if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

// Connect to database first
connectDatabase()

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server for handling exception`)
    process.exit(1)
})

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.log(`Shutting Down the server for: ${err.message}`)
    console.log(`Shutting down the unhandled promise rejection`)
    
    server.close(() => {
        process.exit(1)
    })
})