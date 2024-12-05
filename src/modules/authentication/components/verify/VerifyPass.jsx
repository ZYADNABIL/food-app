import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../services/Urls/urls";
import logo from "../../../../assets/imgs/logo.png";
import { toast } from "react-toastify";

export default function VerifyPass() {
    const navigate =useNavigate()
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({defaultValues:{email:location.state},mode:'onChange'});

      const onSubmit = async (data) =>{
        try {
            let response = await axiosInstance.put(USERS_URLS.VERIFY,data)
            toast.success(response.data.message||"Account verified success")
            navigate("/login",{state:data.email})
        } catch (error) {
            toast.error("failed")            
        }
      }
  return (
    <div className="auth-container">
      <div className="container-fluid  bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 bg-white px-5 py-3 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt="" className="w-75" />
            </div>
            <div className="form-title">
              <h3 className="h-5">Verify your account</h3>
              <span className="text-muted">
                Welcome Back! Please enter your details
              </span>
            </div>
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="text-danger my-3">{errors.email.message}</span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="OTP"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  {...register("code" , {required:"Code is required"})}
                />
              </div>
              {errors.code && (
                <span className="text-danger my-3">{errors.code.message}</span>
              )}
              <button
                disabled={isSubmitting}
                className="w-100 btn btn-success mt-5"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
