const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("./catchAsyncError.js"); // Fixed: Match the actual filename
const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");
const shopModel = require("../model/shopModel.js");

exports.isAuthenticated = catchAsyncError(async(req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});

exports.isSeller = catchAsyncError(async(req,res,next) => {
    const {seller_token} = req.cookies;

    if(!seller_token){
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await shopModel.findById(decoded.id);

    next();
});