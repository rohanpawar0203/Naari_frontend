import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const ChatbotSignup = () => {
  const steps = [
    {
      id: "Greet",
      message: "Hey, Welcome to Naari Website",
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
      trigger: "greetWithName",
    },
    {
      id: "greetWithName",
      message: ({ value, steps }: { value: any; steps: any }) => {
        return `Great ${steps.firstName.message} ${steps.lastName.message}, Nice to meet you!`;
      },
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
      trigger: "registrationSuccessful",
    },
    {
      id: "registrationSuccessful",
      message: "Your Registration is Successful",
      trigger: "getUserData",
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

export default ChatbotSignup;
