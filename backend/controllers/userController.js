const express = require("express");
const User = require("../model/userModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer.js");
const catchAsync = require("../middleware/catchAsyncError.js");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/jwtToken.js");

const router = express.Router();

// Activation token generator
const createActivationToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

router.post(
  "/create-user",
  upload.single("file"),
  catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      if (req.file) {
        const filepath = path.join(__dirname, "..", "uploads", req.file.filename);
        try {
          fs.unlinkSync(filepath);
          console.log("File deleted successfully");
        } catch (err) {
          console.log("Error deleting file:", err);
        }
      }
      return next(new ErrorHandler("User already exists", 400));
    }

    // Check if file was uploaded
    if (!req.file) {
      return next(new ErrorHandler("Please upload an avatar image", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: filename,
        url: fileUrl,
      },
    });

    // Create activation token & URL
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      return res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

  })
);


    router.post("/activation" , catchAsync(async (req,res,next)=>{

   
    try {
        const {activation_token} = req.body
        const newUser = jwt.verify(activation_token , process.env.ACTIVATION_SECRET)

        if(!newUser){return next(new ErrorHandler("Invalid token" , 400))}

        const {name , email , password , avatar} = newUser

        const user = await User.create({
            name , email , password , avatar
        })
            sendToken(user , 201 , res)
         } catch (error) {
        
    }
     }))

module.exports = router;
