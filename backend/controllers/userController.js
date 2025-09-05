const express = require("express");
const User = require("../model/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer.js");
const catchAsync = require("../middleware/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");

const router = express.Router();

// Activation token generator
const createActivationToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/create-user",
  upload.single("file"),
  catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      if (req.file) {
        const filepath = path.join(__dirname, "..", "uploads", req.file.filename);
        try {
          fs.unlinkSync(filepath);
          console.log("File deleted successfully");
        } catch (err) {
          console.log("Error deleting file:", err);
        }
      }
      return next(new ErrorHandler("User already exists", 400));
    }

    // Check if file was uploaded
    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar image", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    // Create user in database with isVerified: false
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: filename,
        url: fileUrl,
      },
      isVerified: false, // Add this field to track verification status
    });

    // Create activation token & URL
    const activationToken = createActivationToken(user);
    console.log("🎯 Created activation token:", activationToken);
    console.log("🎯 Token for user ID:", user._id);
    console.log("🎯 Using secret:", process.env.ACTIVATION_SECRET);
    
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;
    console.log("🔗 Activation URL:", activationUrl);

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } catch (error) {
      // Delete the user and file if email fails
      await User.findByIdAndDelete(user._id);
      if (req.file) {
        const filepath = path.join(__dirname, "..", "uploads", req.file.filename);
        try {
          fs.unlinkSync(filepath);
        } catch (err) {
          console.log("Error deleting file:", err);
        }
      }
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Your existing activation route with more debugging
router.post("/activation", catchAsync(async (req, res, next) => {
  console.log("🎯 Activation route hit!");
  console.log("📦 Request body:", req.body);
  console.log("🌍 Request headers:", req.headers);
  
  try {
    const { activation_token } = req.body;
    
    console.log("🔍 Activation attempt with token:", activation_token);
    console.log("🔑 ACTIVATION_SECRET:", process.env.ACTIVATION_SECRET ? "Present" : "Missing");
    
    if (!activation_token) {
      console.log("❌ No activation token provided");
      return next(new ErrorHandler("Activation token is required", 400));
    }

    // Verify the token
    const decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log("✅ Decoded token:", decoded);

    if (!decoded || !decoded.userId) {
      console.log("❌ Invalid token structure:", decoded);
      return next(new ErrorHandler("Invalid token structure", 400));
    }

    // Find the user by ID
    const user = await User.findById(decoded.userId);
    console.log("👤 Found user:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("❌ User not found with ID:", decoded.userId);
      return next(new ErrorHandler("User not found", 400));
    }

    // Check if user is already verified
    if (user.isVerified) {
      console.log("✅ User already verified");
      return sendToken(user, 200, res);
    }

    // Update user as verified
    user.isVerified = true;
    await user.save();
    console.log("✅ User verified and saved");

    // Send JWT token
    sendToken(user, 200, res);
    
  } catch (error) {
    console.log("❌ Activation error:", error.name, error.message);
    
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Activation token has expired", 400));
    }
    
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid activation token", 400));
    }
    
    return next(new ErrorHandler(`Activation failed: ${error.message}`, 500));
  }
}));

// Fixed login route - replace the existing one in userController.js

router.post(
  "/login-user",
  catchAsync(async (req, res, next) => {
    console.log("🔐 Login route hit!");
    console.log("📦 Login request body:", req.body);
    
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all fields!", 400));
      }

      // Find user and include password field
      const user = await User.findOne({ email }).select("+password");
      console.log("👤 User found:", user ? "Yes" : "No");

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      // Check if user is verified
      if (!user.isVerified) {
        return next(new ErrorHandler("Please verify your email before logging in!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);
      console.log("🔑 Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        return next(new ErrorHandler("Please provide the correct information", 400));
      }

      console.log("✅ Login successful, sending token");
      sendToken(user, 200, res);
      
    } catch (error) {
      console.log("❌ Login error:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


router.get(
  "/getuser",
  isAuthenticated,
  catchAsync(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;