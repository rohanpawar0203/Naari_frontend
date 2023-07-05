import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { IUserData } from "../Login/Login";
import { loginAction } from "../../Redux/Actions/loginAction";
import { useDispatch } from "react-redux";

const theme = {
  background: "#f5f8fb",
  headerBgColor: "#323232",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#323232",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

export interface ISignupFormData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  // type: string;
  // role: string;
  companyName: string;
  revenuePerYear: string;
  gst_in: string;
  pan_number: string;
  aadhar_number: string;
  account_number: string;
  account_name: string;
  ifsc_code: string;
}
const signupFormData: ISignupFormData = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  // type: "",
  // role: "",
  companyName: "",
  revenuePerYear: "",
  gst_in: "",
  pan_number: "",
  aadhar_number: "",
  account_number: "",
  account_name: "",
  ifsc_code: "",
};

const GetUserData = ({ steps }: { steps: any }) => {
  const [signupInput, setSignupInput] = React.useState(signupFormData);

  const navigate = useNavigate();

  useEffect(() => {
    const {
      firstName,
      lastName,
      contactNumber,
      emailAddress,
      companyName,
      revenuePerYear,
      gstIn,
      panNumber,
      aadharNumber,
      accountNumber,
      accountName,
      ifscCode,
    } = steps;

    setSignupInput((prevState) => ({
      ...prevState,
      firstName: firstName.message,
      lastName: lastName.message,
      contact: contactNumber.message,
      email: emailAddress.message,
      companyName: companyName.message,
      revenuePerYear: revenuePerYear.message,
      gst_in: gstIn.message,
      pan_number: panNumber.message,
      aadhar_number: aadharNumber.message,
      account_number: accountNumber.message,
      account_name: accountName.message,
      ifsc_code: ifscCode.message,
    }));
  }, [steps]);

  const registerUser = async () => {
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/register",
        {
          method: "POST",
          body: JSON.stringify(signupInput),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        const data = await res.json();
        toast.error("Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  useEffect(() => {
    registerUser();
  }, [signupInput]);

  console.log("signupInput:", signupInput);

  return <Box>Registration Successful</Box>;
};

const ChatbotLogin = () => {
  const [number, setNumber] = useState<string>("");

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

  function onSignup(phoneNumber: string): void {
    console.log("phoneNumber:", phoneNumber);
    onCaptchVerify();
    setNumber(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    console.log("appVerifier:", appVerifier);

    const formatPh = "+91" + phoneNumber;
    console.log("formatPh:", formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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

  function onOTPVerify(otp: number): boolean {
    return window.confirmationResult
      .confirm(otp)
      .then(async (res: { user: any; }) => {
        toast.success("Verification Successful");
        loginUser();
        return true;
      })
      .catch((err: any) => {
        console.log(err);
        toast.error("Verification Failed");
        return false;
      });
  }

  const steps = [
    {
      id: "Greet",
      message: "Hey, Welcome to Naari Website",
      trigger: "login",
    },
    {
      id: "login",
      message: "Lets Start the Login Process",
      trigger: "askContactNumber",
    },
    {
      id: "askContactNumber",
      message: "Please enter your Contact Number",
      trigger: "contactNumber",
    },
    {
      id: "contactNumber",
      user: true,
      validator: (value: any) => {
        onSignup(value);
        return true;
      },
      trigger: "otpSent",
    },
    {
      id: "otpSent",
      message: "We have sent an OTP on {previousValue}, Please enter the OTP",
      trigger: "otp",
    },
    {
      id: "otp",
      user: true,
      validator: async (value: any) => {
        const verify = await onOTPVerify(value);
        console.log('verify:', verify)
        if(!verify){
          return "Invalid OTP"
        }
        return true;
      },
      trigger: "loginSuccessful",
    },
    {
      id: "loginSuccessful",
      message: "Your Login is Successful",
      end: true,
    },
    {
      id: "getUserData",
      component: <GetUserData steps={undefined} />,
      end: true,
    },
  ];

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box id="recaptcha-container"></Box>
        <ThemeProvider theme={theme}>
          <ChatBot
            headerTitle="Naari Chatbot"
            recognitionEnable={true}
            speechSynthesis={{ enable: true, lang: "hi" }}
            steps={steps}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ChatbotLogin;
