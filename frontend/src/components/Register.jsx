import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import {Navigate, NavLink} from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'


function Register() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const [loading,setLoading] =useState(false)
    const [error,setError]=useState(null)
    const[preview,setPreview]=useState()
    // const[]=useState()


     useEffect(() => {
         return () => {
             if (preview) {
                 URL.revokeObjectURL(preview);
             }
         };
         }, [preview]);



    const onUserRegister=async(newUser)=>{
        console.log(newUser);
        setLoading(true)

         // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);

        try{
            let{role,...user}=newUser
            if(role==="USER")
            {
                let res= await axios.post("http://localhost:4000/users-api/users",newUser)
                console.log(res);
                if(res.status===201){
                    Navigate("/Login");
                }
                let reso=res.data
                console.log(reso)


            }

            if(role==="AUTHOR")
            {
                let res= await axios.post("http://localhost:4000/author-api/users",newUser)
                console.log(res);
                if(res.status===201){
                    Navigate("/Login");
                }
                let reso=res.data
                console.log(reso)


            }
        }catch(err){
        setError(err)

        }finally{
            setLoading(false)
        }

    };

   


  return (
    <div className='flex flex-col items-center gap-1' >
        <h1 className='text-center font-bold text-2xl'>REGISTER</h1>
        <form onSubmit={handleSubmit(onUserRegister)} >
        <div className='flex items-center gap-4 mb-10 mt-5'>
          <input type='radio' value="USER" {...register("role",{required:true})}  />User
           <input type='radio' value="AUTHOR" {...register("role",{required:true})}  />Author
          
         
          {
            errors.role && <p className='text-red-500'>Select role</p>
           }

        </div>


            <div className=' flex gap-5 mt-10'>
            <input type='text' {...register("firstname",{required:true})} id='' placeholder='enter firstname' className='border-2 p-2'/>
            {
                errors.firstname?.type==='required' && <p className='text-red-500'>enter firstame</p>
            }
            
            <input type='text' {...register("lastname",{required:true})} id='' placeholder='enter lastname' className='border-2 p-2'/>
            {
                errors.lastname?.type==='required' && <p className='text-red-500'>enter lastname</p>
            }
            </div>
            <div className=' mt-5'>
                <input type='email' {...register("email",{required:true})} id='' placeholder='enter email' className='border-2 p-2 w-70' />
                {
                errors.email?.type==='required' && <p className='text-red-500'>enter email</p>
                }
            </div>
            <div  className=' mt-5'>
                <input type='password' {...register("password",{required:true})} id='' placeholder='enter password' className='border-2 p-2 w-70' />
                {
                errors.password?.type==='required' && <p className='text-red-500'>enter password</p>
                }
            </div>
            <div className=' mt-5'>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    {...register("profileImageUrl")}
                    className='border-2 p-2 w-70' 
                    onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
                
            }

            

        }} />
            {/* preview of the pic */}
             {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )} 


                {/* <input type='file' onChange={} {...register("profileImageUrl",{required:true})} id='' placeholder='profileImageUrl' className='border-2 p-2 w-70' /> */}
                {
                errors.profileImageUrl?.type==='required' && <p className='text-red-500'>profile image</p>
                }

            </div>
            <div className='text-center'>
            <button type="submit" className="bg-blue-400 px-6 py-2 mt-6 text-white rounded text-center" >Register</button>
           </div>
        </form>

    </div>
  )
}

export default Register