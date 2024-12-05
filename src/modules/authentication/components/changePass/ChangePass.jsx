import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../../../assets/imgs/logo.png";
import {
  PASSWORD_VALIDATION,
} from "../../../../services/validation";
import { Link } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../services/Urls/urls";
import { toast } from "react-toastify";

export default function ChangePass() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axiosInstance.put(USERS_URLS.CHANGE_PASS,data)
      toast.success(response.data.message||"password updated")
    } catch (error) {
      toast.error("failed to update password")
    }
  };
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay ">
        <div className="row vh-100  d-flex justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 col-sm-6 bg-white px-5 py-3 rounded-3">
            <div className="logo-img text-center">
              <img src={logo} alt="" className="w-75" />
            </div>
            <div className="form-title">
              <h3 className="h-5">Change your password</h3>
              <span className="text-muted">
                Welcome Back! Please enter your details
              </span>
            </div>
            <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your old password"
                  aria-describedby="basic-addon1"
                  {...register("oldPassword", PASSWORD_VALIDATION)}
                />
              </div>
              {errors.oldPassword && (
                <span className="text-danger">
                  {errors.oldPassword.message}
                </span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your new password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  {...register("newPassword", PASSWORD_VALIDATION)}
                />
              </div>
              {errors.newPassword && (
                <span className="text-danger">
                  {errors.newPassword.message}
                </span>
              )}
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your new password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  {...register("confirmNewPassword", {
                    required: "confirm your password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "The password doesn't match",
                  })}
                />
              </div>
              {errors.confirmNewPassword && (
                <span className="text-danger">
                  {errors.confirmNewPassword.message}
                </span>
              )}
              <div className="links d-flex justify-content-between my-3">
                <Link
                  to={"/register"}
                  className="text-decoration-none text-black"
                >
                  Register Now?
                </Link>
                <Link
                  to={"/forget-pass"}
                  className="text-decoration-none text-success"
                >
                  Forget Password?
                </Link>
              </div>
              <button className="btn btn-success my-3 w-100" disabled={isSubmitting}> {isSubmitting ? "Loading..." : "Change password"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
