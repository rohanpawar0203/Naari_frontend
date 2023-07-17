import React, { useState } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import OtpVerification from "../../components/OtpVerification/OtpVerification";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import CaptchaVerifier from "../../components/CaptchaVerifier/CaptchaVerifier";

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

const ChatbotLogin = () => {
  const [number, setNumber] = useState<string>("");
  function onCaptchaVerify(): void {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          onSignInSubmit(number);
        },
      },
      auth
    );
  }

  const onSignInSubmit = (phoneNumber: string): void => {
    onCaptchaVerify();
    setNumber(phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + phoneNumber;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP Sent");
        // toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

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
      // validator: (value: any) => {
      //   onSignInSubmit(value);
      //   return true;
      // },
      trigger: "sendOtp",
    },
    {
      id: "sendOtp",
      component: (
        <CaptchaVerifier
          triggerNextStep={undefined}
          previousStep={undefined}
          setNumber={setNumber}
        />
      ),
    },
    {
      id: "otpSent",
      message: ({ value, steps }: {value: any, steps: any }) => {
        // return `We have sent an OTP on ${steps.contactNumber.message}, Please enter the OTP`;
        return value
      },
      trigger: "otp",
    },
    {
      id: "otp",
      user: true,
      trigger: "verifyOTP",
    },
    {
      id: "verifyOTP",
      component: (
        <OtpVerification
          triggerNextStep={undefined}
          previousStep={undefined}
          number={number}
          triggerValue={"loginSuccessful"}
        />
      ),
    },
    {
      id: "loginSuccessful",
      message: "Your Login is Successful",
      end: true,
    },
  ];

  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          padding: "20px",
        }}
      >
        {/* <Box id="recaptcha-container"></Box> */}
        <ThemeProvider theme={theme}>
          <ChatBot
            recognitionEnable={true}
            speechSynthesis={{ enable: true, lang: "hi" }}
            hideHeader={true}
            style={{ width: "100%", height: "100%" }}
            steps={steps}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ChatbotLogin;
