import { UserTypeModel } from "../models/UserModel.js"

const checkAuthor = async(req,res,next)=>{
    let aid=req.body?.author || req.params?.authorId;
    //verify autor
    let author = await UserTypeModel.findById(aid);
    if(!author || author.role!="AUTHOR"){
        return res.status(403).json({message:"invalid author"});
    }
    if(author.role!=='AUTHOR'){
        return res.status(403).json({message:"user is not an author"});
    }
    if(!author.isActive){
        return res.status(403).json({message:"author account is not active"});
    }
    next();
}
export default checkAuthor