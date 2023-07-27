import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import OtpVerification from "../../components/OtpVerification/OtpVerification";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

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
  const [speechLang, setSpeechLang] = useState<string>(
    localStorage.getItem("lang") || ""
  );
  const [voiceLang, setVoiceLang] = useState<string>(
    localStorage.getItem("voiceLang") || ""
  );
  const myTimeoutRef = useRef<any>(null);
  const { t } = useTranslation();

  const alertUser = () => {
    const intervalId = setInterval(() => {
      alert("Please give some input");
    }, 100000);

    myTimeoutRef.current = intervalId;
  };

  const clearMyTimeout = () => {
    console.log(myTimeoutRef.current);
    clearInterval(myTimeoutRef.current);
  };

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
      message: t("Greet"),
      trigger: "login",
    },
    {
      id: "login",
      message: t("login"),
      trigger: "askContactNumber",
    },
    {
      id: "askContactNumber",
      message: t("askContactNumber"),
      trigger: () => {
        alertUser();
        return "contactNumber";
      },
    },
    {
      id: "contactNumber",
      user: true,
      validator: (value: any) => {
        clearMyTimeout();
        const newValue = value.replaceAll(" ", "");
        if (!isNaN(newValue) && newValue.length === 10) {
          onSignInSubmit(newValue);
          return true;
        }
        return t("invalidNumber");
      },
      trigger: "otpSent",
    },
    {
      id: "otpSent",
      message: t("otpSent"),
      trigger: () => {
        alertUser();
        return "otp";
      },
    },
    {
      id: "otp",
      user: true,
      validator: (value: any) => {
        clearMyTimeout();
        const newValue = value.replaceAll(" ", "");
        if (!isNaN(newValue) && newValue.length === 6) {
          return true;
        }
        return t("invalidOtp");
      },
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
      message: t("loginSuccessful"),
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
        <Box id="recaptcha-container"></Box>
        <ThemeProvider theme={theme}>
          <ChatBot
            recognitionEnable={true}
            speechSynthesis={{ enable: true, lang: speechLang }}
            recognitionLang={voiceLang}
            hideHeader={true}
            style={{ width: "100%", height: "100%" }}
            steps={steps}
            enableSmoothScroll={true}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ChatbotLogin;
