import exp from 'express'
import { ArticleModel } from '../models/ArticleModel.js'
import { UserTypeModel } from '../models/UserModel.js'

export const adminRoute=exp.Router()

//read all articles
adminRoute.get('/articles',async(req,res,next)=>{
    try{
        let articlesList= await ArticleModel.find()
        res.status(200).json({message:"list of articles",payload:articlesList})
    }catch(err){
        next(err)
    }
})

//block users
adminRoute.put('/users/:userId/block',async(req,res,next)=>{
    try{
        let userId=req.params.userId
        let user = await UserTypeModel.findByIdAndUpdate(userId,{isActive:false},{new:true})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user blocked successfully",payload:user})
    }catch(err){
        next(err)
    }
})

//unblock user
adminRoute.put('/users/:userId/unblock',async(req,res,next)=>{
    try{
        let userId=req.params.userId
        let user = await UserTypeModel.findByIdAndUpdate(userId,{isActive:true},{new:true})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user unblocked successfully",payload:user})
    }catch(err){
        next(err)
    }
})