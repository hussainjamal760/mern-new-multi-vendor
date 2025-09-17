const express = require("express");
const Shop = require("../model/shopModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const router = express.Router();

// ✅ Create activation token function
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// ------------------- Shop Create Route -------------------
router.post("/shop-create", upload.single("file"), async (req, res, next) => {
  try {
  

    const { email } = req.body;
    
    // Check if file was uploaded
    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar image", 400));
    }

    const sellerEmail = await Shop.findOne({ email });

    // If email already exists → delete uploaded file & throw error
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
      return next(new ErrorHandler("Shop already exists with this email", 400));
    }

    const filename = req.file.filename;
    const fileUrl = filename;

    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl, // ✅ Match the schema structure
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode, // ✅ Fixed field name
    };


    // ✅ Generate activation token & url
    const activationToken = createActivationToken(seller);
    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${seller.email}) to activate your shop!`,
      });
    } catch (error) {
      // Delete uploaded file if email fails
      const filePath = `uploads/${req.file.filename}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.error("Shop creation error:", error);
    // Delete uploaded file if any error occurs
    if (req.file) {
      const filePath = `uploads/${req.file.filename}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }
    return next(new ErrorHandler(error.message, 400));
  }
});

// ------------------- Shop Activation Route -------------------
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      // ✅ Verify token
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      // ✅ Create shop
      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      // ✅ Send token after activation
      sendToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Replace the login-shop route in your shopController.js with this:

router.post("/login-shop", catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    // Use Shop model instead of Seller
    const shop = await Shop.findOne({ email }).select("+password");

    if (!shop) {
      return next(new ErrorHandler("Shop doesn't exist!", 400));
    }

    // Check if password is valid
    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct information", 400));
    }

    // Send token for successful login
    sendToken(shop, 200, res);
    
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
}));


module.exports = router;