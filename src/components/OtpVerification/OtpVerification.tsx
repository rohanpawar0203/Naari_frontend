import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginAction } from "../../Redux/Actions/loginAction";
import { IUserData } from "../../pages/Login/Login";
import { CgSpinner } from "react-icons/cg";
import styles from "./OtpVerification.module.scss";

const OtpVerification = ({
  triggerNextStep,
  previousStep,
  number,
}: {
  triggerNextStep: any;
  previousStep: any;
  number: string;
}) => {
  const [verified, setVerified] = useState<boolean>(false);
  console.log("triggerNextStep:", triggerNextStep);

  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ contact: parseInt(number.slice(2, 12)) }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: IUserData = await res.json();
      if (res.ok) {
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("userId", data.user._id);
        loginAction(true, dispatch);
      } else {
        loginAction(false, dispatch);
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  const onOTPVerify = async (otp: number) => {
    console.log("otp:", otp);
    try {
      const result = await window.confirmationResult.confirm(otp);
      toast.success("Verification Successful");
      loginUser();
      setVerified(true);
      triggerNextStep({ value: "", trigger: "loginSuccessful" });
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Verification Failed");
      triggerNextStep({ value: "", trigger: "otp" });
      return false;
    }
  };

  useEffect(() => {
    onOTPVerify(previousStep.message);
  }, [previousStep.message]);

  return (
    <Box>
      {verified && <Typography>OTP Verified</Typography>}
      {!verified && <Typography>Wrong OTP</Typography>}
    </Box>
  );
};

export default OtpVerification;
