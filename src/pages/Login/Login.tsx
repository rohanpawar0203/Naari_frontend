import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styles from "./Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { loginAction } from "../../Redux/Actions/loginAction";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
}

export interface IUserData {
  token: string;
  user: IUser;
}

const Login = () => {
  const [otp, setOtp] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onCaptchVerify(): void {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  // function onSignup(): void {
  //   setLoading(true);
  //   onCaptchVerify();

  //   const appVerifier = window.recaptchaVerifier;

  //   const formatPh = "+" + number;

  //   signInWithPhoneNumber(auth, formatPh)
  //     .then((confirmationResult) => {
  //       window.confirmationResult = confirmationResult;
  //       setLoading(false);
  //       setShowOTP(true);
  //       toast.success("OTP sent successfully!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoading(false);
  //     });
  // }

  const loginUser = async () => {
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/login",
        {
          method: "POST",
          body: `{ "contact": ${parseInt(number.slice(2, 12))} }`,
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
        navigate("/");
      } else {
        loginAction(false, dispatch);
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  function onOTPVerify(): void {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res: { user: any }) => {
        toast.success("Verification Successful");
        setLoading(false);
        loginUser();
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Verification Failed");
        setLoading(false);
      });
  }

  return (
    <Box className={styles.login}>
      <ToastContainer
        position="top-center"
        autoClose={500}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Box className={styles.loginForm}>
        <Typography variant="h6">Login Via OTP</Typography>
        {showOTP ? (
          <Box>
            <Box className={styles.inputBox}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>&nbsp;&nbsp;</span>}
                inputStyle={{
                  width: "45px",
                  height: "40px",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </Box>
            <Box className={styles.buttonBox}>
              <Button
                size="medium"
                variant="contained"
                onClick={onOTPVerify}
                className={styles.verifyButton}
              >
                {loading && <CgSpinner size={20} className={styles.spinner} />}
                <span>Verify OTP</span>
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box id="recaptcha-container"></Box>
            <Box className={styles.inputBox}>
              <PhoneInput country={"in"} value={number} onChange={setNumber} />
            </Box>
            <Box className={styles.buttonBox}>
              <Button
                size="medium"
                variant="contained"
                // onClick={onSignup}
                className={styles.sendCodeButton}
              >
                {loading && <CgSpinner size={20} className={styles.spinner} />}
                Send code via SMS
              </Button>
            </Box>
          </Box>
        )}
        <Box className={styles.partitionBox}>
          <Box className={styles.partitionLine}></Box>
          <span>OR</span>
          <Box className={styles.partitionLine}></Box>
        </Box>
        <Box className={styles.endBox}>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
