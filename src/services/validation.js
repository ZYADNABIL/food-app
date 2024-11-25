export const EMAIL_VALIDATION = {
    required :"Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message:"Email isn't valid",
    }                        
   }
   export const PASSWORD_VALIDATION ={
    required :"Password is required",                     
   }
   export const OTP_VALIDATION={
    required:"OTP is required",
  }
  export const CONFIRM_PASSWORD={
    required:"Confirm your password"
  }