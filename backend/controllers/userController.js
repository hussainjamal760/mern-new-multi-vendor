const  express =require( "express")
const  User =require( "../model/userModel.js")
const  ErrorHandler =require( "../utils/errorHandler.js")
const  path =require( "path")
const  { upload } =require( "../multer.js")

const router = express.Router()

router.post("/create-user" , upload.single("file") , async (req , res , next)=>{
    const {name , email , password} = req.body
    const userEmail = await User.findOne({email})

    if(userEmail) return next(new ErrorHandler("User already exists" , 400))

    const filename = req.file.filename
    const fileUrl  = path.join(filename)
    const user = {
        name,
        email,
        password,
        avatar : fileUrl
    }
})

module.exports= router