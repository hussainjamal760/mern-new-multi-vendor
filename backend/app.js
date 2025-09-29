const express = require("express")
const dotenv = require("dotenv")
const ErrorHandler = require("./utils/errorHandler.js")
const cookieParser = require("cookie-parser")
const userController = require("./controllers/userController.js")
const shopController = require("./controllers/shopController.js")
const productController = require("./controllers/productController.js")
const eventController = require("./controllers/eventController.js") // ✅ Make sure this is imported
const coupounCodeController = require("./controllers/coupounCodeController.js") // ✅ Make sure this is imported
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
app.use("/api/v2/event", eventController) 
app.use("/api/v2/copoun", coupounCodeController) 

// Test route
app.get("/", (req, res) => {
    res.json({ 
        success: true, 
        message: "Server is running successfully!" 
    })
})

// ✅ Add a debug route to check all registered routes
app.get("/debug/routes", (req, res) => {
    const routes = [];
    
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            // Single route
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods)
            });
        } else if (middleware.name === 'router') {
            // Router middleware
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: middleware.regexp.source + handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });
    
    res.json({
        success: true,
        routes: routes,
        message: "All registered routes"
    });
});

// Error handling middleware (should be last)
app.use(errorMiddleware)

module.exports = app