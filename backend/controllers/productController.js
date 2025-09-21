// backend/controllers/productController.js - COMPLETELY FIXED VERSION
const express = require("express");
const catchAsync = require("../middleware/catchAsyncError");
const router = express.Router();
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");



router.post(
  "/create-product",
  upload.array("images"),
  catchAsync(async (req, res, next) => {
    try {
      console.log("📝 Creating product...");
      console.log("📄 Request body:", req.body);
      console.log("📷 Files received:", req.files?.length || 0);
      console.log("🔍 Files details:", req.files?.map(f => ({ 
        filename: f.filename, 
        size: f.size, 
        mimetype: f.mimetype 
      })));

      const shopId = req.body.shopId;
      console.log("🏪 Shop ID:", shopId);
      
      // Validate shop exists
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      // Validate files
      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("Please upload at least one product image!", 400));
      }

   
      console.log("🖼️ Image filenames:", imageUrls);

      // Validate required fields
      if (!req.body.name || !req.body.description || !req.body.category || !req.body.discountPrice || !req.body.stock) {
        return next(new ErrorHandler("Please fill all required fields!", 400));
      }

      // Create product data
      const productData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags || "",
        originalPrice: Number(req.body.originalPrice) || 0,
        discountPrice: Number(req.body.discountPrice),
        stock: Number(req.body.stock),
        shopId: shopId,
        shop: shop,
        images: imageUrls // ✅ Simple array of strings
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
        message: "Product created successfully!"
      });

    } catch (error) {
   
      // Handle validation errors specifically
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return next(new ErrorHandler(messages.join(', '), 400));
      }
      
      return next(new ErrorHandler(error.message || "Product creation failed", 400));
    }
  })
);

// ✅ ADD: Get all products for a shop
router.get("/get-all-products-shop/:id", catchAsync(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

module.exports = router;