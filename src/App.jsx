
import './App.css'
import { Routes ,Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Login from './modules/authentication/components/Login/Login'
import Registeration from './modules/authentication/components/registeration/registeration'
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
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute'
function App() {

 const [loginData, setLoginData] = useState(null)
 const saveLoginData = () =>{
      let encodedToken = localStorage.getItem("token")
      let decodedToken = jwtDecode(encodedToken)
      setLoginData(decodedToken)
 }

  const routes = createBrowserRouter([

    {
      path:'',
      element:<AuthLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index:true,element:<Login saveLoginData={saveLoginData}/>},
        {path:'login', element:<Login saveLoginData={saveLoginData}/>},
        {path:'register', element:<Registeration/>},
        {path:'forget-pass', element:<ForgetPass/>},
        {path:'change-pass', element:<ChangePass/>},
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
      {path:'receipe-data',element:<ReciepesData/>},
      {path:'categories',element:<CategoriesList/>},
      {path:'categorie-data',element:<CategoriesData/>},
      {path:'users',element:<UsersList/>},
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
