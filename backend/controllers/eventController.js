const express = require("express");
const catchAsync = require("../middleware/catchAsyncError");
const router = express.Router();
const Event = require("../model/EventModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const { upload } = require("../multer");


router.post(
  "/create-event",
  upload.array("images"),
  catchAsync(async (req, res, next) => {
    try {

      const shopId = req.body.shopId;

      // Validate shop exists
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      // Validate files
      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("Please upload at least one product image!", 400));
      }

      // ✅ FIXED: Create imageUrls array from uploaded files
      const imageUrls = req.files.map(file => file.filename);

      // Validate required fields
      if (!req.body.name || !req.body.description || !req.body.category || !req.body.discountPrice || !req.body.stock) {
        return next(new ErrorHandler("Please fill all required fields!", 400));
      }

      // Create product data
      const eventData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags || "",
        originalPrice: Number(req.body.originalPrice) || 0,
        discountPrice: Number(req.body.discountPrice),
        stock: Number(req.body.stock),
        shopId: shopId,
        shop: shop,
        images: imageUrls
      };

      const event = await Event.create(eventData);

      res.status(201).json({
        success: true,
        event,
        message: "Event created successfully!"
      });

    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        return next(new ErrorHandler(messages.join(', '), 400));
      }
      
      return next(new ErrorHandler(error.message || "Event creation failed", 400));
    }
  })
)

module.exports = router