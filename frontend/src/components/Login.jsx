import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { userAuth } from '../stores/userAuth'
import { NavLink, useNavigate } from 'react-router'


function Login() {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const login=userAuth(state=>state.login)
  const isAuthenticated=userAuth(state=>state.isAuthenticated)
  const currentUser=userAuth(state=>state.currentUser);
  const navigate=useNavigate();
  console.log(isAuthenticated)

  const onUserLogin=async(userCredObj)=>{
    await login(userCredObj)
   
    
  };
useEffect(()=>{
  if(isAuthenticated && currentUser){
    if(currentUser.role==="USER"){
      navigate("/userprofile");
    }
    if(currentUser.role==="AUTHOR"){
      navigate("/authorprofile")
    }
  }

},
[isAuthenticated,currentUser]);

  // const submitForm=async(obj)=>{
  //   console.log(obj)
  // }


  return (
    <div className='flex flex-col items-center gap-1'>
      <h1 className='font-bold text-2xl text-center'>LOGIN</h1>
      <form onSubmit={handleSubmit(onUserLogin)} >
        <div className='mt-5'>
          <select {...register("role",{required:true})} className='border-2 p-2 w-50'>
            <option value="">select role</option>
            <option value="USER">User</option>
            <option value="AUTHOR">Author</option>
            <option value="ADMIN">Admin</option>
            
          </select>
          {
            errors.role && <p className='text-red-500'>Select role</p>
           }
        </div>
            <div className='mt-5'>
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
            <div className='text-center'>
              <button type='submit' className="bg-blue-400 px-6 py-2 mt-6 text-white rounded">Login</button>
            </div>


      </form>

    </div>

  )
   
}

export default Login