const express = require("express");
const Shop = require("../model/shopModel.js"); // ✅ Import Shop model
const ErrorHandler = require("../utils/errorHandler.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js"); // ✅ Use this, not sendShopToken
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
    const sellerEmail = await Shop.findOne({ email });

    // If email already exists → delete uploaded file & throw error
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = filename; // ✅ No need path.join

    const seller = {
      name: req.body.name,
      email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
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
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// ------------------- Shop Activation Route -------------------
router.post(
  "/shop/activation",
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
        return next(new ErrorHandler("User already exists", 400));
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

module.exports = router;
