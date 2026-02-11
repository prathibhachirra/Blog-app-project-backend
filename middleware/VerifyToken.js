import jwt from 'jsonwebtoken'
import { config } from 'dotenv';


export const verifyToken =async(req,res,next)=>{
   
    //read token from req
    let token=req.cookies.token;
    console.log("token",token)
    if(!token){
        return res.stauts(400).json({message:"authorized req.plz login"})
    }
   //verify the vaildate(decoding the token)
let decodedToke = jwt.verify(token,process,EncodedVideoChunk.JWT_)
   //forward req to nxt middleware/route
}