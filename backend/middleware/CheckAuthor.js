import { UserTypeModel } from "../models/UserModel.js"

const checkAuthor = async(req,res,next)=>{
    let aid=req.body?.author || req.params?.authorId;
    console.log('Checking author for id:', aid);
    //verify autor
    let author = await UserTypeModel.findById(aid);
    if(!author || author.role!="AUTHOR"){
        console.log('Invalid author or not AUTHOR role:', author?.role);
        return res.status(403).json({message:"invalid author"});
    }
    if(author.role!=='AUTHOR'){
        console.log('User is not an author:', author.role);
        return res.status(403).json({message:"user is not an author"});
    }
    // if(!author.isActive){
    //     return res.status(403).json({message:"author account is not active"});
    // }
    console.log('Author check passed for:', aid);
    next();
}
export default checkAuthor