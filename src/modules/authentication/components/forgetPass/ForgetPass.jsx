import React from 'react'
import logo from '../../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ForgetPass() {
  let navigate = useNavigate()
  let {register,formState:{errors},handleSubmit} = useForm()
  const onSubmit = async (data) =>{
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data)
      console.log(response);
      toast.success('check your email !')
      navigate('/reset-pass')
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
    
  }
  return (
    <div className='auth-container'>
      <div className="container-fluid  bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 bg-white px-5 py-3 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt=""  className='w-75' />
            </div>
            <div className="form-title">
              <h3 className="h-5">Forgot Your Password?</h3>
              <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
            </div>
            <form className='my-4' onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                <input type="email"
                 className="form-control" 
                 placeholder="Enter your email" 
                 aria-label="email" 
                 aria-describedby="basic-addon1"
                 {...register("email",{
                   required:"Email is required",
                   pattern:{
                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                     message:"Email isn't valid"
                   }
                 })}
                />
              </div>
              {errors.email&&(
                <span className="text-danger my-3">{errors.email.message}</span>
              )}
              <button className='w-100 btn btn-success mt-5'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
