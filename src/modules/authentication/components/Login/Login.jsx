import React from 'react'
import logo from '../../../../assets/imgs/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login({saveLoginData}) {
  let navigate = useNavigate()
  let {
    register,
    formState:{errors},
    handleSubmit,
  } = useForm()
  const onSubmit = async (data) =>{
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
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
                       {...register("email",{
                        required :"Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message:"Email isn't valid",
                        }                        
                       })}
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
                       {...register("password",{
                        required :"Password is required",                     
                       })}
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
