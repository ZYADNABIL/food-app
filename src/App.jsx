
import './App.css'
import { Routes ,Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Login from './modules/authentication/components/Login/Login'
import Registeration from './modules/authentication/components/Registeration/Registeration'
import ForgetPass from './modules/authentication/components/forgetPass/ForgetPass'
import ChangePass from './modules/authentication/components/changePass/ChangePass'
import ResetPass from './modules/authentication/components/resetPass/ResetPass'
import NotFound from './modules/shared/components/Notfound/NotFound'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard'
import ReciepesList from './modules/reciepes/components/reciepesList/ReciepesList'
import ReciepesData from './modules/reciepes/components/reciepesData/ReciepesData'
import CategoriesList from './modules/categories/components/categoriesList/CategoriesList'
import CategoriesData from './modules/categories/components/categoriesData/CategoriesData'
import UsersList from './modules/users/components/usersList/UsersList'
import { ToastContainer } from 'react-toastify'
import { useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Navigate } from 'react-router-dom';
  
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
import ReciepeForm from './modules/reciepes/components/reciepeForm/ReciepeForm'
import { AuthContext } from './context/AuthContext'
import FavouriteList from './modules/favourites/components/FavouriteList'
import VerifyPass from './modules/authentication/components/verify/VerifyPass'
function App() {
  let {loginData} = useContext(AuthContext)

  const routes = createBrowserRouter([

    {
      path:'',
      element:<AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index:true,element:<Login />},
        {path:'login', element:<Login />},
        {path:'register', element:<Registeration/>},
        {path:'forget-pass', element:<ForgetPass/>},
        {path:'change-pass', element:<ChangePass/>},
        {path:'verify-pass', element:<VerifyPass/>},
        {path:'reset-pass', element:<ResetPass/>},
      ]
    },
    {
      path:'Dashboard',
      element:
      <ProtectedRoute>
        <MasterLayout/>
      </ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
      {index:true,element:<Dashboard/>},
      {path:'receipes',element:<ReciepesList/>},
      // {path:'receipes/new-reciepe',element:<ReciepeForm/>},
      {path:'receipes/:recipeId',element:<ReciepeForm/>},
      {path:'receipe-data',element:<ReciepesData/>},
      {path:'favourites',element: loginData?.userGroup != "SystemUser" ? <Navigate replace to="/Dashboard"/>:  <FavouriteList/> },
      {path:'categories',element: loginData?.userGroup == "SystemUser" ? <Navigate replace to="/Dashboard" /> : <CategoriesList/> },
      {path:'categorie-data',element:<CategoriesData/>},
      {path:'users',element:loginData?.userGroup == "SystemUser" ? <Navigate replace to="/Dashboard" /> : <UsersList/>},
      ]
    }


  ])

  return (
    <>
    <ToastContainer/>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
