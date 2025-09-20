// Debug version of the getuser route - add this to your userController.js

router.get("/getuser", isAuthenticated, catchAsync(async (req, res, next) => {
  try {
    // Add detailed logging
    console.log("📝 GET /getuser called");
    console.log("🔍 req.user:", req.user);
    console.log("🆔 req.user type:", typeof req.user);
    
    if (!req.user) {
      console.log("❌ No req.user found");
      return next(new ErrorHandler("No user found in request", 401));
    }

    console.log("🔑 req.user._id:", req.user._id);
    console.log("🔑 req.user.id:", req.user.id);

    // Try different approaches to get user ID
    let userId;
    if (req.user._id) {
      userId = req.user._id;
      console.log("✅ Using req.user._id");
    } else if (req.user.id) {
      userId = req.user.id;
      console.log("✅ Using req.user.id");
    } else {
      console.log("❌ No user ID found");
      return next(new ErrorHandler("No user ID found", 400));
    }

    console.log("🔍 Looking for user with ID:", userId);
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found in database");
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    console.log("✅ User found:", user.name, user.email);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Get user error:", error);
    console.error("❌ Error stack:", error.stack);
    return next(new ErrorHandler(error.message, 500));
  }
}));