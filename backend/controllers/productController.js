const express = require("express");
const catchAsync = require("../middleware/catchAsyncError");
const router = express.Router();
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");

router.post(
  "/create-product",upload.array("images"),
  catchAsync(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
       const files = req.files
       const imageUrls = files.map((file) => `${file.filename}`)
      
        const productData = req.body;
        productData.images = imageUrls;
        productData.shop = shop;

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router