import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div className='flex justify-end bg-gray-200 '> 
        <nav>
            <ul className='flex justify-between p-10 gap-10 font-semibold '>
                <li>
                    <NavLink to="/home" className={({isActive})=>isActive? "text-blue-500" :""} >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive})=>isActive? "text-blue-500" :""}>Register</NavLink>
                </li>
                <li>
                    <NavLink to ="/login" className={({isActive})=>isActive? "text-blue-500":""}>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/addarticle" className={({isActive})=>isActive? "text-blue-500":""}> AddArticle</NavLink>
                </li>
                <li>
                    <NavLink to="userprofile" ></NavLink>
                </li>
                <li>
                    <NavLink to="authorprofile" ></NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header