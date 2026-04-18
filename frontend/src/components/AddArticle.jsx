import React from 'react'
import { useForm } from 'react-hook-form'

function AddArticle() {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const submitform=async(obj)=>{
    console.log(obj)
  }
  return (
    <div  className='flex flex-col items-center gap-1'>
      <h1 className='text-center font-bold'>Add Article</h1>
      <form onSubmit={handleSubmit(submitform)} >
        <div className=' mt-5'>
          <input type='text' {...register("title",{required:true})} id='' placeholder='Title' className='border-2 p-2 w-60 text-center' />
          {
            errors.title?.type==='required' && <p className='text-red-500'>title is required</p>
          }
        </div>
        <div className=' mt-5'>
          <input type='text' {...register("category",{required:true})} id='' placeholder='Category' className='border-2 p-2 w-60 text-center' />
          {
            errors.category?.type==='required' && <p className='text-red-500'>category is required</p>
          }
        </div>
        <div className='mt-5 '>
          <input type='text' {...register("content",{required:true})} id='' placeholder='content' className='border-2 p-10 w-60 text-center ' />
          {
            errors.content?.type==='required' && <p className='text-red-500'>content is required</p>
          }
        </div>
        <div className='text-center'>
              <button type='submit' className="bg-blue-400 px-6 py-2 mt-6 text-white rounded">Publish Article</button>
            </div>


      </form>
    </div>
  )
}

export default AddArticle