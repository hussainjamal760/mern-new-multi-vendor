// backend/controllers/coupounCodeController.js - COMPLETE FIXED VERSION
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Shop = require("../model/shopModel");
const ErrorHandler = require("../utils/errorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCodeModel");
const router = express.Router();

// create coupoun code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("📝 Creating coupon code...");
      console.log("📄 Request body:", req.body);

      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupon code already exists!", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      console.log("✅ Coupon code created:", coupounCode);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      console.error("❌ Coupon creation error:", error);
      return next(new ErrorHandler(error.message || "Failed to create coupon", 400));
    }
  })
);

// get all coupons of a shop - FIXED: Use req.seller._id from auth
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("🔍 Fetching coupons for authenticated seller:", req.seller._id);
      console.log("🔍 Route param (should match):", req.params.id);

      // Use the authenticated seller's ID, not the route parameter
      const couponCodes = await CoupounCode.find({ shopId: req.seller._id.toString() });

      console.log("📦 Found coupons:", couponCodes.length);
      console.log("📦 Coupons:", couponCodes);

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      console.error("❌ Fetch coupons error:", error);
      return next(new ErrorHandler(error.message || "Failed to fetch coupons", 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("🗑️ Deleting coupon:", req.params.id);
      console.log("🔑 Authenticated seller:", req.seller._id);

      const couponCode = await CoupounCode.findById(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code doesn't exist!", 400));
      }

      // Verify ownership
      if (couponCode.shopId !== req.seller._id.toString()) {
        return next(new ErrorHandler("You can only delete your own coupons!", 403));
      }

      await CoupounCode.findByIdAndDelete(req.params.id);

      console.log("✅ Coupon deleted successfully");

      res.status(200).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      console.error("❌ Delete coupon error:", error);
      return next(new ErrorHandler(error.message || "Failed to delete coupon", 400));
    }
  })
);

// get coupon code value by its name (public route)
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log("🔍 Fetching coupon by name:", req.params.name);

      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      console.error("❌ Fetch coupon by name error:", error);
      return next(new ErrorHandler(error.message || "Failed to fetch coupon", 400));
    }
  })
);

module.exports = router;