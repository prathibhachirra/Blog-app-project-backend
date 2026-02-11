import exp from 'express'
import {connect} from 'mongoose'
import { userRoute } from './API/Userapi.js'
import { authorRoute } from './API/Authorapi.js'
import { adminRoute } from './API/Adminapi.js'
import { commonRoute } from './API/Commonapi.js'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
config() //process.env 
const app=exp()
// add body parser middleware
app.use(exp.json())
app.use('/users-api',userRoute)
app.use('/admin-api',adminRoute)
app.use('/author-api',authorRoute)
app.use("cookie-parser",cookieParser)
app.use("/common-api",commonRoute)
//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("database is connected successfully")
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on http://localhost: ${process.env.PORT}`)
    });
    }catch(err){
        console.log("err in database",err)
    }

}
connectDB()

//dealing with invalid path
app.use((req,res,next)=>{
    console.log(req.url),
    res.json({message: "${req.url} is invalid path"});
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.log("err:",err)
    res.status(500).json({message:"error",reason:err.message})

})