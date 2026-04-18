import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from 'react-router'

function Rootlayout() {
  return (
    <div>
        <Header />
        <div className='min-h-screen mx-20 p-10'>
            <Outlet />
        </div>
        <Footer />
        
    </div>
  )
}

export default Rootlayout