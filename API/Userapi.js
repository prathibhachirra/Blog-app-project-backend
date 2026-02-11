import exp from 'express'
import {authenticate, register} from '../services/authservice.js'
import CheckAuthor from '../middleware/checkAuthor.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import { ArticleModel } from '../models/ArticleModel.js';
export const userRoute=exp.Router()

//register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj = await register({...userObj,role:"USER"})
    //send res
    res.status(201).json({message:"user created",payload:userObj})
});


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
    let commentObj=req.body,
    articleId
})