const express = require("express")
const User = require("../model/userModel.js")
const ErrorHandler = require("../utils/errorHandler.js")
const path = require("path")
const { upload } = require("../multer.js")
const catchAsync = require("../middleware/catchAsyncError.js")

const router = express.Router()

router.post("/create-user", upload.single("file"), catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body
    
    // Check if user already exists
    const userEmail = await User.findOne({ email })
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400))
    }

    // Check if file was uploaded
    if (!req.file) {
        return next(new ErrorHandler("Please upload an avatar image", 400))
    }

    const filename = req.file.filename
    const fileUrl = path.join(filename)
    
    // Create user object with proper avatar structure
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: filename, // Using filename as public_id for now
            url: fileUrl
        }
    })

    // Generate JWT token
    const token = user.getJwtToken()

    // Remove password from response
    user.password = undefined

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
        token
    })
}))

module.exports = router