import React from 'react'
import logo from '../../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
export default function ResetPass() {
  let navigate = useNavigate()
  let {register,formState:{errors},handleSubmit} = useForm()
  const onsubmit = async (data) =>{
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data)
      console.log(response);
      toast.success('password reset successfully')
      navigate('/login')
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
    }
  }
  return (
    <>
    <div className='auth-container'>
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 bg-white px-5 py-4 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt="" className='w-75' />
            </div>
            <div className="form-title my-4">
              <h3 className="h-5">
                Reset  Password
              </h3>
              <span className="text-muted">Please Enter Your Otp  or Check Your Inbox</span>
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-envelope"></i></span>
                <input type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1" 
                  {...register("email",{
                    required:"email is required",
                    pattern:{
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message:"email isn't valid" 
                    }
                  })}
                  />
              </div>
              {errors.email&&(
                <span className="text-danger my-3">{errors.email.message}</span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                <input type="text"
                  className="form-control"
                  placeholder="OTP"
                  aria-label="otp"
                  aria-describedby="basic-addon1" 
                  {...register("seed",{
                    required:"OTP is required",
                  })}
                  />
              </div>
              {errors.seed&&(
                <span className="text-danger mb-3">{errors.seed.message}</span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                <input type="password"
                  className="form-control"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon1" 
                  {...register("password",{
                    required:"Password is required",
                  })}
                  />
              </div>
              {errors.password&&(
                <span className="text-danger mb-3">{errors.password.message}</span>

              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                <input type="password"
                  className="form-control"
                  placeholder="Confirm New Password"
                  aria-label="Confirm New Password"
                  aria-describedby="basic-addon1" 
                  {...register("confirmPassword",{
                    required:"Confirm your password"
                  })}
                  />
              </div>
              {errors.confirmPassword&&(
                <span className="text-danger mb-3">{errors.confirmPassword.message}</span>
              )}
              <button className="btn btn-success w-100">
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
