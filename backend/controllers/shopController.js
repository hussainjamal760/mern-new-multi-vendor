const express = require("express");
const User = require("../model/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer.js");
const catchAsyncErrors = require("../middleware/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");
const router = express.Router();


router.post("/shop-create" , upload.single("file") , async (req,res,next)=>{
    try {
        const {email} = req.body;
        const sellerEmail = await Shop.findOne({email});
        if(sellerEmail){
            const filename = req.file.filename;
            const filePath =`uploads/${filename}`
            fs.unlink(filePath,(err)=>{
                if(err){
                    console.log(err);
                    res.status(500).json({message : "Error Deleting file"})
                }
            }) 
            return next(new ErrorHandler("User already exists" , 400))
        }

        const filename = req.file.filename
        const fileUrl = path.join(filename)

        const seller = {
            name : req.body.name,
            email:email,
            password : req.body.password,
            avatar : fileUrl,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber,
            zipCode : req.body.zipCode,
        };

        const activationToken = `http:localhost:5173/seller/activation/${activationToken}`
try {
    await sendMail({
      email: user.email,
      subject: "Activate your shop",
      message: `Hello ${user.name}, please click on the link to activate your shop: ${activationUrl}`,
    });

    return res.status(201).json({
      success: true,
      message: `Please check your email (${user.email}) to activate your shop!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500)); 
  }
    } catch (error) {
         return next(new ErrorHandler(error.message, 400)); 
    }
})

const createActivationToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};


// activate user
router.post(
  "/shop/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("User already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);


module.exports = router;
