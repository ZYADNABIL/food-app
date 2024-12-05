import React, { useContext } from 'react'
import logo from '../../../../assets/imgs/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance, USERS_URLS } from '../../../../services/Urls/urls'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation'
import { AuthContext } from '../../../../context/AuthContext'
export default function Login() {
  const location = useLocation()
  let {saveLoginData} = useContext(AuthContext)
  let navigate = useNavigate()
  let {
    register,
    formState:{errors},
    handleSubmit,
  } = useForm({defaultValues:{email:location.state},mode:'onChange'})
  const onSubmit = async (data) =>{
    try {
      let response = await axiosInstance.post(USERS_URLS.LOGIN,data);
      toast.success("Login successful!");
      localStorage.setItem("token",response.data.token);
      saveLoginData()
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  }
  return (
    <>
    <div className='auth-container'>
      <div className="container-fluid bg-overlay ">
        <div className="row vh-100  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 bg-white px-5 py-3 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt="" className='w-75' />
            </div>
            <div className="form-title">
              <h3 className='h-5'>Login</h3>
              <span className='text-muted'>Welcome Back! Please enter your details</span>
            </div>
            <form className='my-3' onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-envelope"></i>
                </span>
                <input type="email"
                       className="form-control"
                       placeholder="Enter your E-mail" 
                       aria-label="Email" 
                       aria-describedby="basic-addon1"
                       {...register("email",EMAIL_VALIDATION)}
                       />
              </div>
              {errors.email &&(
                <span className='text-danger'>{errors.email.message}</span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-lock"></i>
                </span>
                <input type="password"
                       className="form-control"
                       placeholder="Password"
                       aria-label="password"
                       aria-describedby="basic-addon1"
                       {...register("password",PASSWORD_VALIDATION)}
                       />
              </div>
              {errors.password &&(
                <span className='text-danger'>{errors.password.message}</span>
              )}
            <div className="links d-flex justify-content-between my-3">
              <Link to={'/register'} className='text-decoration-none text-black'>Register Now?</Link>
              <Link to={'/forget-pass'} className='text-decoration-none text-success'>Forget Password?</Link>
            </div>
            <button className='btn btn-success my-3 w-100'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
