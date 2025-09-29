const express = require("express");
const catchAsync = require("../middleware/catchAsyncError");
const router = express.Router();
const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");

// ✅ Create product
router.post(
  "/create-product",
  upload.array("images"),
  catchAsync(async (req, res, next) => {
    try {
      console.log("📝 Creating product...");
      console.log("📄 Request body:", req.body);
      console.log("📷 Files received:", req.files?.length || 0);

      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      if (!req.files || req.files.length === 0) {
        return next(
          new ErrorHandler("Please upload at least one product image!", 400)
        );
      }

      // store filenames in DB
      const imageUrls = req.files.map((file) => file.filename);

      if (
        !req.body.name ||
        !req.body.description ||
        !req.body.category ||
        !req.body.discountPrice ||
        !req.body.stock
      ) {
        return next(new ErrorHandler("Please fill all required fields!", 400));
      }

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
        images: imageUrls,
      };

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
        message: "Product created successfully!",
      });
    } catch (error) {
      console.error("❌ Product creation error:", error);
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);
        return next(new ErrorHandler(messages.join(", "), 400));
      }
      return next(
        new ErrorHandler(error.message || "Product creation failed", 400)
      );
    }
  })
);

// ✅ Get all products for a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsync(async (req, res, next) => {
    try {
      console.log("🔍 Getting products for shop:", req.params.id);

      const products = await Product.find({ shopId: req.params.id }).sort({
        createdAt: -1,
      });

      console.log("📦 Found products:", products.length);

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.error("❌ Get products error:", error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// ✅ Delete product and its images
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsync(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product not found!", 404));
      }

      if (product.shopId.toString() !== req.seller._id.toString()) {
        return next(
          new ErrorHandler("You can only delete your own products!", 403)
        );
      }

      // delete images from uploads
      if (product.images && product.images.length > 0) {
        product.images.forEach((filename) => {
          const filePath = path.join(__dirname, "../uploads", filename);
          console.log("🗑️ Trying to delete:", filePath);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`❌ Failed to delete: ${filePath}`, err.message);
            } else {
              console.log(`✅ Deleted: ${filePath}`);
            }
          });
        });
      }

      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Product and images deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
