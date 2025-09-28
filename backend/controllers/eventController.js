// backend/controllers/eventController.js - COMPLETE FIX
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
  res.json({
    success: true,
    message: "Event controller is working!",
    route: "/api/v2/event/test",
    timestamp: new Date().toISOString()
  });
});

// 🧪 TEMPORARY: Test DELETE without auth
router.delete("/test-delete/:id", (req, res) => {
  res.json({
    success: true,
    message: "Test DELETE route is working!",
    id: req.params.id
  });
});

// 🧪 TEMPORARY: Test DELETE with auth
router.delete("/test-delete-auth/:id", isSeller, (req, res) => {
 
  res.json({
    success: true,
    message: "Test DELETE with auth is working!",
    id: req.params.id,
    seller: req.seller?._id
  });
});

// Create event
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
        return next(new ErrorHandler("Please upload at least one event image!", 400));
      }

      // Create imageUrls array from uploaded files
      const imageUrls = req.files.map(file => file.filename);

      // Validate required fields
      const missingFields = [];
      if (!req.body.name) missingFields.push("name");
      if (!req.body.description) missingFields.push("description");
      if (!req.body.category) missingFields.push("category");
      if (!req.body.discountPrice) missingFields.push("discountPrice");
      if (!req.body.stock) missingFields.push("stock");
      if (!req.body.start_Date) missingFields.push("start_Date");
      if (!req.body.Finish_Date) missingFields.push("Finish_Date");

      if (missingFields.length > 0) {
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


      const event = await Event.create(eventData);


      res.status(201).json({
        success: true,
        event,
        message: "Event created successfully!"
      });

    } catch (error) {
      
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
    
    const events = await Event.find({ shopId: req.params.id }).sort({ createdAt: -1 });
    

    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// ✅ MAIN DELETE ROUTE - FIXED WITH BETTER LOGGING
router.delete("/delete-shop-event/:id", isSeller, catchAsync(async (req, res, next) => {
  try {
 
    const eventId = req.params.id;
    
    // Check if event ID is valid
    if (!eventId) {
      return next(new ErrorHandler("Event ID is required!", 400));
    }

    // Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return next(new ErrorHandler("Event not found!", 404));
    }

    
    if (event.shopId !== req.seller._id.toString()) {
      return next(new ErrorHandler("You can only delete your own events!", 403));
    }

    // Delete the event
    await Event.findByIdAndDelete(eventId);


    res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));

// Get all events (public endpoint)
router.get("/get-all-events", catchAsync(async (req, res, next) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}));


module.exports = router;