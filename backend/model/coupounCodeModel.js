// backend/model/productModel.js - COMPLETELY FIXED VERSION
const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupoun code name!"],
    unique: true,
  },
  value:{
    type : Number,
    required:true,
  },
  minAmount:{
    type : Number,
  },
  maxAmount:{
    type : Number,
  },
  selectedProduct:{
    type: String
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CoupounCode", couponCodeSchema);