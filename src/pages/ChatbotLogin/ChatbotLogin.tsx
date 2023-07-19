import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import OtpVerification from "../../components/OtpVerification/OtpVerification";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import i18n from "../../i18n";
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
  const [currLang, setCurrLang] = useState<string>("en");
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    console.log("lang:", lang);
    if (lang) {
      setCurrLang(lang);
      i18n.changeLanguage(lang);
    }
  }, []);

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
      trigger: "contactNumber",
    },
    {
      id: "contactNumber",
      user: true,
      validator: (value: any) => {
        if (!isNaN(value) && value.length == 10) {
          onSignInSubmit(value);
          return true;
        }
        return t("invalidNumber");
      },
      trigger: "otpSent",
    },
    {
      id: "otpSent",
      message: t("otpSent"),
      trigger: "otp",
    },
    {
      id: "otp",
      user: true,
      validator: (value: any) => {
        if (!isNaN(value) && value.length == 6) {
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
        {/* <Box id="recaptcha-container"></Box> */}
        <ThemeProvider theme={theme}>
          <ChatBot
            recognitionEnable={true}
            speechSynthesis={{ enable: true, lang: currLang }}
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
