const express = require("express");
const catchAsync = require("../middleware/catchAsyncError");
const router = express.Router();
const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const { upload } = require("../multer");
const { isSeller } = require("../middleware/auth");

// Test route to verify the controller is working
router.get("/test", (req, res) => {
  console.log("🔍 Event controller test route hit!");
  res.json({
    success: true,
    message: "Event controller is working!",
    route: "/api/v2/event/test",
    timestamp: new Date().toISOString()
  });
});

router.post(
  "/create-event",
  upload.array("images"),
  catchAsync(async (req, res, next) => {
    try {
      console.log("📝 Creating event...");
      console.log("📄 Request body:", req.body);
      console.log("📷 Files received:", req.files?.length || 0);

      // ✅ DETAILED VALIDATION LOGGING
      console.log("🔍 Field validation:");
      console.log("- name:", req.body.name ? "✅" : "❌", req.body.name);
      console.log("- description:", req.body.description ? "✅" : "❌", req.body.description);
      console.log("- category:", req.body.category ? "✅" : "❌", req.body.category);
      console.log("- discountPrice:", req.body.discountPrice ? "✅" : "❌", req.body.discountPrice);
      console.log("- stock:", req.body.stock ? "✅" : "❌", req.body.stock);
      console.log("- start_Date:", req.body.start_Date ? "✅" : "❌", req.body.start_Date);
      console.log("- Finish_Date:", req.body.Finish_Date ? "✅" : "❌", req.body.Finish_Date);

      const shopId = req.body.shopId;
      console.log("🏪 Shop ID:", shopId);

      // Validate shop exists
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      }

      // Validate files
      if (!req.files || req.files.length === 0) {
        return next(new ErrorHandler("Please upload at least one event image!", 400));
      }

      // Create imageUrls array from uploaded files
      const imageUrls = req.files.map(file => file.filename);
      console.log("🖼️ Image filenames:", imageUrls);

      // ✅ IMPROVED: More specific validation messages
      const missingFields = [];
      if (!req.body.name) missingFields.push("name");
      if (!req.body.description) missingFields.push("description");
      if (!req.body.category) missingFields.push("category");
      if (!req.body.discountPrice) missingFields.push("discountPrice");
      if (!req.body.stock) missingFields.push("stock");
      if (!req.body.start_Date) missingFields.push("start_Date");
      if (!req.body.Finish_Date) missingFields.push("Finish_Date");

      if (missingFields.length > 0) {
        console.log("❌ Missing fields:", missingFields);
        return next(new ErrorHandler(`Missing required fields: ${missingFields.join(', ')}`, 400));
      }

      // Add date validation
      const startDate = new Date(req.body.start_Date);
      const endDate = new Date(req.body.Finish_Date);
      
      if (isNaN(startDate.getTime())) {
        return next(new ErrorHandler("Invalid start date format!", 400));
      }
      
      if (isNaN(endDate.getTime())) {
        return next(new ErrorHandler("Invalid end date format!", 400));
      }
      
      if (startDate >= endDate) {
        return next(new ErrorHandler("End date must be after start date!", 400));
      }

      // Create event data
      const eventData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags || "",
        originalPrice: Number(req.body.originalPrice) || 0,
        discountPrice: Number(req.body.discountPrice),
        stock: Number(req.body.stock),
        start_Date: startDate,
        Finish_Date: endDate,
        shopId: shopId,
        shop: shop,
        images: imageUrls
      };

      console.log("📦 Event data to be saved:", JSON.stringify(eventData, null, 2));

      const event = await Event.create(eventData);

      console.log("✅ Event created successfully:", event._id);

      res.status(201).json({
        success: true,
        event,
        message: "Event created successfully!"
      });

    } catch (error) {
      console.error("❌ Event creation error:", error);
      
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        console.log("📝 Validation errors:", messages);
        return next(new ErrorHandler(messages.join(', '), 400));
      }
      
      return next(new ErrorHandler(error.message || "Event creation failed", 400));
    }
  })
);

// Get all events for a shop
router.get("/get-all-events-shop/:id", catchAsync(async (req, res, next) => {
  try {
    console.log("🔍 Getting events for shop:", req.params.id);
    
    const events = await Event.find({ shopId: req.params.id }).sort({ createdAt: -1 });
    
    console.log("🎉 Found events:", events.length);

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("❌ Get events error:", error);
    return next(new ErrorHandler(error.message, 400));
  }
}));

// ✅ ADD: Delete product endpoint
router.delete("/delete-shop-event/:id", isSeller, catchAsync(async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorHandler("Event not found!", 404));
    }

    // Check if the product belongs to the seller
    if (event.shopId !== req.seller._id.toString()) {
      return next(new ErrorHandler("You can only delete your own Event!", 403));
    }

    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

module.exports = router;