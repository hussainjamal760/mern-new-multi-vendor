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

// Import auth middleware at the top
const { isAuthenticated } = require("../middleware/auth.js");

const router = express.Router();

console.log("🎯 UserController: Starting route definitions...");

// Test route without any middleware
router.get("/test", (req, res) => {
  console.log("🧪 Test route hit!");
  res.json({
    success: true,
    message: "User controller is working!",
    route: "/api/v2/user/test",
    timestamp: new Date().toISOString()
  });
});

// Simple getuser route without authentication first
router.get("/getuser-simple", catchAsync(async (req, res, next) => {
  console.log("👤 Simple GetUser route hit!");
  
  res.status(200).json({
    success: true,
    message: "Simple getuser route working!",
    note: "This route doesn't require authentication"
  });
}));

// Protected getuser route
router.get("/getuser", isAuthenticated, catchAsync(async (req, res, next) => {
  console.log("👤 Protected GetUser route hit!");
  console.log("🔍 User from token:", req.user);
  
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

// Activation token generator
const createActivationToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post("/create-user", upload.single("file"), catchAsync(async (req, res, next) => {
  console.log("📝 Create user route hit!");
  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    if (req.file) {
      const filepath = path.join(__dirname, "..", "uploads", req.file.filename);
      try {
        fs.unlinkSync(filepath);
      } catch (err) {
        console.log("Error deleting file:", err);
      }
    }
    return next(new ErrorHandler("User already exists", 400));
  }

  if (!req.file) {
    return next(new ErrorHandler("Please upload an avatar image", 400));
  }

  const filename = req.file.filename;
  const fileUrl = path.join(filename);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: filename,
      url: fileUrl,
    },
    isVerified: false,
  });

  const activationToken = createActivationToken(user);
  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

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
}));

router.post("/activation", catchAsync(async (req, res, next) => {
  console.log("🎯 Activation route hit!");
  
  try {
    const { activation_token } = req.body;
    
    if (!activation_token) {
      return next(new ErrorHandler("Activation token is required", 400));
    }

    const decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (!decoded || !decoded.userId) {
      return next(new ErrorHandler("Invalid token structure", 400));
    }

    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    if (user.isVerified) {
      return sendToken(user, 200, res);
    }

    user.isVerified = true;
    await user.save();

    sendToken(user, 200, res);
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Activation token has expired", 400));
    }
    
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid activation token", 400));
    }
    
    return next(new ErrorHandler(`Activation failed: ${error.message}`, 500));
  }
}));

router.post("/login-user", catchAsync(async (req, res, next) => {
  console.log("🔐 Login route hit!");
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }

    if (!user.isVerified) {
      return next(new ErrorHandler("Please verify your email before logging in!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct information", 400));
    }

    sendToken(user, 200, res);
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));


router.get("/logout", isAuthenticated, catchAsync(async (req, res, next) => {
  
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'lax' 
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));

module.exports = router;