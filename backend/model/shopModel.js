const mongoose = require("mongoose");


const shopSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please enter your Shop name!"],
  },
  email:{
    type: String,
    required: [true, "Please enter your Sjop email!"],
  },
  password:{
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password should be greater than 4 characters"],
    select: false,
  },
  phoneNumber:{
    type: Number,
    required:true
  },
  address:{
    type: String,
    required:true
  },
   description:{
    type: String,
  },
  role:{
    type: String,
    default: "seller",
  },
  avatar:{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
 },
 createdAt:{
  type: Date,
  default: Date.now(),
 }
});

module.exports = mongoose.model("Shop", shopSchema);