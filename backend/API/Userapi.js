import exp from 'express'
import {authenticate, register} from '../services/authservice.js'
import CheckAuthor from '../middleware/checkAuthor.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';
import { upload } from '../config/Multer.js';
export const userRoute=exp.Router()

// //register user
// userRoute.post('/users',async(req,res)=>{
//     //get user obj from req
//     let userObj=req.body;
//     //call register
//     const newUserObj = await register({...userObj,role:"USER"})
//     //send res
//     res.status(201).json({message:"user created",payload:newUserObj})
// });


//register user
userRoute.post(
        "/users",
        upload.single("profileImageUrl"),
        async (req, res, next) => {
        let cloudinaryResult;

            try {
                let userObj = req.body;

                //  Step 1: upload image to cloudinary from memoryStorage (if exists)
                if (req.file) {
                cloudinaryResult = await uploadToCloudinary(req.file.buffer);
                }

                // Step 2: call existing register()
                const newUserObj = await register({
                ...userObj,
                role: "USER",
                profileImageUrl: cloudinaryResult?.secure_url,
                });

                res.status(201).json({
                message: "user created",
                payload: newUserObj,
                });

            } catch (err) {

                // Step 3: rollback 
                if (cloudinaryResult?.public_id) {
                await cloudinary.uploader.destroy(cloudinaryResult.public_id);
                }

                next(err); // send to your error middleware
            }

        }
        );


//authenticate user
userRoute.post('/authenticate',async(req,res)=>{
    let userCred=req.body;
    let {token,user}=await authenticate(userCred)
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,

    });
    //send res
    res.status(200).json({message:"login successful",payload:user})
})

//read all articles(protected route)
userRoute.get('/articles',verifyToken,async(req,res)=>{
    let articlesList= await ArticleModel.find()
    res.status(404).json({message:"articles empty",payload:articlesList})
})

//add comment to an article(protected route)
userRoute.put('/articles',verifyToken,async(req,res)=>{
    const {user,articleId,comment}=req.body;
    console.log(req.body);
    if(user!=req.user.userId){
        return res.status(403).json({message:"forbiden"})
    }
   let  articleWithComment=await ArticleModel.findByIdAndUpdate(
    articleId,
    {$push:{comments:{user,comment}}},
    {new:true,runValidators:true},
   );
   //if article not found
   if(!articleWithComment){
    return res.status(404).json({message:"article not found"})
   }
   //send res
   res.status(200).json({message:"comment added",payload:articleWithComment});

})