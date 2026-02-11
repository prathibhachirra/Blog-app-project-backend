import { Schema,model } from "mongoose"
const userSchema=new Schema({
    firstname:{
        type:String,
        required:[true,'first name is required']
    },
    lastname:{
        type:String,
    },
    password:{
        type:String,
        required:[true,'password is required']

    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,"email already existed"]

    },
    profileImageUrl:{
        type:String,
    
    },
    role:{
        type:String,
        enum:["AUTHOR",'USER',"ADMIN"],
        required:[true,"invalid role"]
       
    },
    isActive:{
        type:Boolean,
        default:true,
}},
        {
        timestamps:true,
        strict:"throw",
        versionKey:false
    },
)

//create model
export const UserTypeModel=model('user',userSchema)