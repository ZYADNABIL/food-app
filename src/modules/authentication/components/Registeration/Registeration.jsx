import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/imgs/logo.png";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../services/validation";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../services/Urls/urls";
import { toast } from "react-toastify";

export default function Registration() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(USERS_URLS.REGISTER,data)
      toast.success(response?.data?.message)
      navigate("/verify-pass",{state:data.email})
    } catch (error) {
      toast.error(error?.response?.message||"failed")
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-6 col-sm-6 bg-white px-5 py-3 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt="logo" className="w-75" />
            </div>
            <div className="form-title">
              <h3>Register</h3>
              <span className="text-muted">Welcome Back! Please enter your details.</span>
            </div>
            <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex justify-content-between align-items-start gap-5">
                <div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="UserName"
                      {...register("userName", {
                        required: "User name is required",
                      })}
                    />
                  </div>
                  {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                </div>

                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      {...register("email", EMAIL_VALIDATION)}
                    />
                  </div>
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-start gap-5">
                <div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      <i className="fa-solid fa-earth-americas"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Country"
                      {...register("country", { required: "Enter your country" })}
                    />
                  </div>
                  {errors.country && <span className="text-danger">{errors.country.message}</span>}
                </div>

                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-mobile"></i>
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="PhoneNumber"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                      })}
                    />
                  </div>
                  {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-start gap-5">
                <div>
                  <div className="input-group mb-2">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", PASSWORD_VALIDATION)}
                    />
                  </div>
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>

                <div>
                  <div className="input-group mb-3">
                    <span className="input-group-text">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      {...register("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                          value === watch("password") || "Passwords don't match",
                      })}
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                </div>
              </div>

              <div className="links d-flex justify-content-between my-3">
                <Link to="/login" className="text-decoration-none text-black">
                  Login Now?
                </Link>
                <Link to="/forget-pass" className="text-decoration-none text-success">
                  Forget Password?
                </Link>
              </div>
              <button className="btn btn-success w-100" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
