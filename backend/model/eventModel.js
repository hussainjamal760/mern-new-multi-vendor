// backend/model/productModel.js - COMPLETELY FIXED VERSION
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your event product category!"],
  },
  start_Date:{
    type:Date,
    required:true,
  },
   Finish_Date:{
    type:Date,
    required:true,
  },
   status:{
    type:String,
    default: "Running",
  },
  tags: {
    type: String,
    default: "",
  },
  originalPrice: {
    type: Number,
    default: 0,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter your event product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  // ✅ COMPLETELY FIXED: Simple array of strings for now
  images: {
    type: [String],
    required: [true, "Please upload at least one image!"],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: "At least one image is required!"
    }
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Event", eventSchema);