import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Rootlayout from './components/Rootlayout'
import AddArticle from './components/AddArticle'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import Login from './components/Login'
import Register from './components/Register'
import UserDashboard from './components/UserDashboard'
import UserProfile from './components/UserProfile'
import AuthorProfile from './components/AuthorProfile'
import {Toaster} from 'react-hot-toast'

function App() {
  const routerobj=createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout />,
      children:[
        {
          path:"",
          element:<Home />,
        },
        {
          path:"addarticle",
          element:<AddArticle/>
        },
        {
          path:"admindashboard",
          element:<AdminDashboard />
        },
        {
          path:"authordashboard",
          element:<AuthorDashboard />
        },
        {
          path:"login",
          element:<Login />
        },
        {
          path:"register",
          element:<Register />
        },
        {
          path:"userdashboard",
          element:<UserDashboard />
        },
         {
          path:"userprofile",
          element:<UserProfile />
        },
         {
          path:"authorprofile",
          element:<AuthorProfile />
        },
      ]
    }
  ])
  return (<>
  {/* <Toaster position='top-center' */}

  <RouterProvider router={routerobj} />
  </>)
}

export default App