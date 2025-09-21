const express = require("express")
const dotenv = require("dotenv")
const ErrorHandler = require("./utils/ErrorHandler.js")
const cookieParser = require("cookie-parser")
const userController = require("./controllers/userController.js")
const shopController = require("./controllers/shopController.js")
const productController = require("./controllers/productController.js")
const cors = require("cors")
const app = express()
const errorMiddleware = require("./middleware/error.js")

// Load environment variables first
if(process.env.NODE_ENV !== "PRODUCTION"){
    dotenv.config({
        path:"backend/config/.env"
    })
}

// CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Add your frontend URLs
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Serve static files from uploads directory
app.use("/", express.static("uploads"))

// Routes
app.use("/api/v2/user", userController)
app.use("/api/v2/shop", shopController)
app.use("/api/v2/product", productController)

// Test route
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Server is running successfully!" 
    })
})

// Error handling middleware (should be last)
app.use(errorMiddleware)

module.exports = app