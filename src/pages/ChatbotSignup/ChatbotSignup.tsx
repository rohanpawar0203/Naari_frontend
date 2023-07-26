import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpVerification from "../../components/OtpVerification/OtpVerification";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

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
  // userId: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
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
  // userId: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  companyName: "",
  revenuePerYear: "",
  gst_in: "",
  pan_number: "",
  aadhar_number: "",
  account_number: "",
  account_name: "",
  ifsc_code: "",
};

const ChatbotSignup = () => {
  const [number, setNumber] = useState<string>("");
  const [signupInput, setSignupInput] = React.useState(signupFormData);
  const [speechLang, setSpeechLang] = useState<string>("hi");
  const [voiceLang, setVoiceLang] = useState<string>("hi-IN");
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      setSpeechLang(lang);
      if (lang == "en") {
        setVoiceLang("en-US");
      } else if (lang == "hi") {
        setVoiceLang("hi-IN");
      }
      i18n.changeLanguage(lang);
    }
  }, []);

  const handleLocalStorage = (details: any) => {
    setSignupInput((prev) => {
      localStorage.setItem(
        "signupInput",
        JSON.stringify({ ...prev, ...details })
      );
      return { ...prev, ...details };
    });
  };

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
        // toast.success("Signup successful");
        console.log("Signup successful");
      } else {
        const data = await res.json();
        // toast.error("Signup failed");
        console.log("Signup failed");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Server error");
      console.log("Server error");
    }
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
      trigger: () => {
        const signupDraftString = localStorage.getItem("signupInput");
        if (signupDraftString) {
          const signupDraft: ISignupFormData = JSON.parse(signupDraftString);
          setSignupInput(signupDraft);
          if (signupDraft.contact === "") {
            return "askContactNumber";
          } else if (signupDraft.firstName === "") {
            return "askFirstName";
          } else if (signupDraft.lastName === "") {
            return "askFirstName";
          } else if (signupDraft.email === "") {
            return "askEmailAddress";
          } else if (signupDraft.companyName === "") {
            return "askCompanyName";
          } else if (signupDraft.revenuePerYear === "") {
            return "askRevenuePerYear";
          } else if (signupDraft.gst_in === "") {
            return "askGstIn";
          } else if (signupDraft.pan_number === "") {
            return "askPanNumber";
          } else if (signupDraft.aadhar_number === "") {
            return "askAadharNumber";
          } else if (signupDraft.account_number === "") {
            return "askAccountNumber";
          } else if (signupDraft.account_name === "") {
            return "askAccountName";
          } else if (signupDraft.ifsc_code === "") {
            return "askIfscCode";
          }
        }
        return "askContactNumber";
      },
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
      trigger: "otp",
    },
    {
      id: "otp",
      user: true,
      validator: (value: any) => {
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
          triggerValue={"otpSuccessful"}
        />
      ),
    },
    {
      id: "otpSuccessful",
      message: (steps: any) => {
        handleLocalStorage({ contact: steps.steps.contactNumber.message });
        return t("otpVerified");
      },
      trigger: "askFirstName",
    },
    {
      id: "askFirstName",
      message: t("askFirstName"),
      trigger: "firstName",
    },
    {
      id: "firstName",
      user: true,
      validator: (value: any) => {
        if (/^[a-zA-Z]+$/.test(value)) {
          return true;
        }
        return t("invalidFirstName");
      },
      trigger: "askLastName",
    },
    {
      id: "askLastName",
      message: t("askLastName"),
      trigger: "lastName",
    },
    {
      id: "lastName",
      user: true,
      validator: (value: any) => {
        if (/^[a-zA-Z]+$/.test(value)) {
          return true;
        }
        return t("invalidLastName");
      },
      trigger: "greetWithName",
    },
    {
      id: "greetWithName",
      message: ({ value, steps }: { value: string; steps: any }) => {
        handleLocalStorage({
          firstName: steps.firstName.message,
          lastName: steps.lastName.message,
        });
        return t("greetWithName", {
          firstName: steps.firstName.message,
          lastName: steps.lastName.message,
        });
      },
      trigger: "askEmailAddress",
    },
    {
      id: "askEmailAddress",
      message: t("askEmailAddress"),
      trigger: "emailAddress",
    },
    {
      id: "emailAddress",
      user: true,
      validator: (value: any) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(value) || value === "") {
          handleLocalStorage({ email: value });
          return true;
        }
        return t("invalidEmailAddress");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askCompanyName",
    },
    {
      id: "askCompanyName",
      message: t("askCompanyName"),
      trigger: "companyName",
    },
    {
      id: "companyName",
      user: true,
      validator: (value: any) => {
        const companyNamePattern = /^[a-zA-Z0-9\s]+$/;
        if (companyNamePattern.test(value) || value === "") {
          handleLocalStorage({ companyName: value });
          return true;
        }
        return t("invalidCompanyName");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askRevenuePerYear",
    },
    {
      id: "askRevenuePerYear",
      message: t("askRevenuePerYear"),
      trigger: "revenuePerYear",
    },
    {
      id: "revenuePerYear",
      user: true,
      validator: (value: any) => {
        const a = Number(value);
        if ((!isNaN(a) && a > 0) || value === "") {
          handleLocalStorage({ revenuePerYear: value });
          return true;
        }
        return t("invalidRevenue");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askGstIn",
    },
    {
      id: "askGstIn",
      message: t("askGstIn"),
      trigger: "gstIn",
    },
    {
      id: "gstIn",
      user: true,
      validator: (value: any) => {
        const gstNumberPattern = /^[A-Za-z0-9]+$/;
        if (gstNumberPattern.test(value) || value === "") {
          handleLocalStorage({ gst_in: value });
          return true;
        }
        return t("invalidGST");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askPanNumber",
    },
    {
      id: "askPanNumber",
      message: t("askPanNumber"),
      trigger: "panNumber",
    },
    {
      id: "panNumber",
      user: true,
      validator: (value: any) => {
        const capitalPan = value.toUpperCase();
        const panNumberPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
        if (panNumberPattern.test(capitalPan) || capitalPan === "") {
          handleLocalStorage({ pan_number: capitalPan });
          return true;
        }
        return t("invalidPan");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askAadharNumber",
    },
    {
      id: "askAadharNumber",
      message: t("askAadharNumber"),
      trigger: "aadharNumber",
    },
    {
      id: "aadharNumber",
      user: true,
      validator: (value: any) => {
        const aadharRegex = /^\d{12}$/;
        if (aadharRegex.test(value) || value === "") {
          handleLocalStorage({ aadhar_number: value });
          return true;
        }
        return t("invalidAadhar");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askAccountNumber",
    },
    {
      id: "askAccountNumber",
      message: t("askAccountNumber"),
      trigger: "accountNumber",
    },
    {
      id: "accountNumber",
      user: true,
      validator: (value: any) => {
        if (/^\d+$/.test(value) || value === "") {
          handleLocalStorage({ account_number: value });
          return true;
        }
        return t("invalidAccountNumber");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askAccountName",
    },
    {
      id: "askAccountName",
      message: t("askAccountName"),
      trigger: "accountName",
    },
    {
      id: "accountName",
      user: true,
      validator: (value: any) => {
        if (/^[a-zA-Z\s]+$/.test(value) || value === "") {
          handleLocalStorage({ account_name: value });
          return true;
        }
        return t("invalidAccountName");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "askIfscCode",
    },
    {
      id: "askIfscCode",
      message: t("askIfscCode"),
      trigger: "ifscCode",
    },
    {
      id: "ifscCode",
      user: true,
      validator: (value: any) => {
        const ifscCodePattern = /^[A-Za-z0-9]+$/;
        if (ifscCodePattern.test(value) || value === "") {
          handleLocalStorage({ ifsc_code: value });
          registerUser();
          return true;
        }
        return t("invalidIFSC");
      },
      placeholder: t("chatBotPlaceholder"),
      trigger: "registrationSuccessful",
    },
    {
      id: "registrationSuccessful",
      message: t("registrationSuccessful"),
      end: true,
    },
  ];

  return (
    <Box>
      <Navbar />
      <Box sx={{ padding: "20px" }}>
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
            key={speechLang}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ChatbotSignup;
