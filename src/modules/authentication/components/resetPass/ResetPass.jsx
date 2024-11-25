import React from 'react'
import logo from '../../../../assets/imgs/logo.png'
import { useForm } from 'react-hook-form'
import { useState } from 'react' 
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { USERS_URLS } from '../../../../services/Urls/urls';
import { CONFIRM_PASSWORD, EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation';
export default function ResetPass() {
  let navigate = useNavigate()
  const location = useLocation()
  const [isPawwordVisible, setIsPawwordVisible] = useState(false)
  console.log(location.state);
  
  let {register,formState:{errors},handleSubmit,watch} = useForm({defaultValues:{email:location.state},mode:'onChange'})
  const onsubmit = async (data) =>{
    try {
      const response = await axios.post(USERS_URLS.RESET,data)
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
                  disabled={true}
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="basic-addon1" 
                  {...register("email")}
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
                  {...register("seed",OTP_VALIDATION)}
                  />
              </div>
              {errors.seed&&(
                <span className="text-danger mb-3">{errors.seed.message}</span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-lock"></i></span>
                <input type={isPawwordVisible? "text" : "password"}
                  className="form-control"
                  placeholder="New Password"
                  aria-label="New Password"
                  aria-describedby="basic-addon1" 
                  {...register("password",PASSWORD_VALIDATION)}
                  
                  />
                    <button type='button' onMouseDown={(e)=>{
                      e.preventDefault()
                    }} onMouseUp={(e)=>{
                      e.preventDefault()
                    }} onClick={()=>{
                      setIsPawwordVisible((prev)=>!prev)
                    }}>
                      {isPawwordVisible? <i className='fa-solid fa-eye'></i>:<i className='fa-solid fa-eye-slash'></i>}
                    </button>
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
                    ...CONFIRM_PASSWORD,
                    validate:(confirmPassword)=>{
                      return confirmPassword === watch("password") ? "" :"password don't match"
                    }
                  },
                  )}
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
