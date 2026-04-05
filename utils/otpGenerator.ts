import { otpMax, OtpMin } from "./constant";

export const generateOtp = () => {
  const otp = Math.floor(Math.random() * (otpMax - OtpMin) + OtpMin);
  return otp;
};
