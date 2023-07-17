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

const GetUserData = (signupInput: any) => {
  return <Box>Registration Successful</Box>;
};

const ChatbotSignup = () => {
  const [number, setNumber] = useState<string>("");
  const [signupInput, setSignupInput] = React.useState(signupFormData);
  const navigate = useNavigate();

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
        navigate("/login");
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
      message: "Hey, Welcome to Naari Website",
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
      message: "Please enter your Contact Number",
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
        return "Please enter a valid Number";
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
      validator: (value: any) => {
        if (!isNaN(value) && value.length == 6) {
          return true;
        }
        return "Please enter a valid OTP";
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
        return "Your otp is successfully verified";
      },
      trigger: "askFirstName",
    },
    {
      id: "askFirstName",
      message: "Please enter your First Name",
      trigger: "firstName",
    },
    {
      id: "firstName",
      user: true,
      validator: (value: any) => {
        if (/^[a-zA-Z]+$/.test(value)) {
          return true;
        }
        return "Invalid First Name";
      },
      trigger: "askLastName",
    },
    {
      id: "askLastName",
      message: "Please enter your Last Name",
      trigger: "lastName",
    },
    {
      id: "lastName",
      user: true,
      validator: (value: any) => {
        if (/^[a-zA-Z]+$/.test(value)) {
          return true;
        }
        return "Invalid Last Name";
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
        return `Great ${steps.firstName.message} ${steps.lastName.message}, Nice to meet you!`;
      },
      trigger: "askEmailAddress",
    },
    {
      id: "askEmailAddress",
      message: "Please enter your Email Address",
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
        return "Invalid Email Address";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askCompanyName",
    },
    {
      id: "askCompanyName",
      message: "Please enter your Company Name",
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
        return "Invalid Company Name";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askRevenuePerYear",
    },
    {
      id: "askRevenuePerYear",
      message: "Please enter your Per Year Revenue",
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
        return "Invalid Per Year Revenue.";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askGstIn",
    },
    {
      id: "askGstIn",
      message: "Please enter your GST Number",
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
        return "Invalid GST Number";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askPanNumber",
    },
    {
      id: "askPanNumber",
      message: "Please enter your Pan Number",
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
        return "Invalid PAN Number";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askAadharNumber",
    },
    {
      id: "askAadharNumber",
      message: "Please enter your Aadhar Number",
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
        return "Invalid Aadhar Number";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askAccountNumber",
    },
    {
      id: "askAccountNumber",
      message: "Please enter your Account Number",
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
        return "Invalid Account Number";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askAccountName",
    },
    {
      id: "askAccountName",
      message: "Please enter your Account Name",
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
        return "Invalid Account Name";
      },
      placeholder: "Press Enter to Skip",
      trigger: "askIfscCode",
    },
    {
      id: "askIfscCode",
      message: "Please enter your IFSC code",
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
        return "Invalid IFSC Code";
      },
      placeholder: "Press Enter to Skip",
      trigger: "registrationSuccessful",
    },
    {
      id: "registrationSuccessful",
      message: "Your Registration is Successful",
      trigger: "getUserData",
    },
    {
      id: "getUserData",
      component: <GetUserData signupInput={signupInput} />,
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

export default ChatbotSignup;
