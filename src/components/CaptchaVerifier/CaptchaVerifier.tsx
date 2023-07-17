import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";

const CaptchaVerifier = ({
  triggerNextStep,
  previousStep,
  setNumber,
}: {
  triggerNextStep: any;
  previousStep: any;
  setNumber: any;
}) => {
  //   function onCaptchaVerify(phoneNumber: string): void {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       "recaptcha-container",
  //       {
  //         // size: "invisible",
  //         callback: () => {
  //           onSignInSubmit(phoneNumber);
  //         },
  //       },
  //       auth
  //     );
  //   }

  //   const onSignInSubmit = (phoneNumber: string): void => {
  //     onCaptchaVerify(phoneNumber);
  //     setNumber(phoneNumber);

  //     const appVerifier = window.recaptchaVerifier;

  //     const formatPh = "+91" + phoneNumber;

  //     signInWithPhoneNumber(auth, formatPh, appVerifier)
  //       .then((confirmationResult) => {
  //         window.confirmationResult = confirmationResult;
  //         console.log("OTP Sent");
  //         triggerNextStep({ value: "", trigger: "otpSent" });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  function onCaptchaVerify(phoneNumber: string): void {
    console.log("phoneNumber:", phoneNumber);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        // size: "invisible",
        // callback: (response: any) => {
        //   onSignInSubmit(phoneNumber);
        // },
      },
      auth
    );
  }

  const onSignInSubmit = (phoneNumber: string): void => {
    setNumber(phoneNumber);
    onCaptchaVerify(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + phoneNumber;
    console.log("formatPh:", formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP Sent");
        triggerNextStep({ value: "OTP has been sent", trigger: "otpSent" });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    // onCaptchaVerify(previousStep.message);
    onSignInSubmit(previousStep.message);
  });

  return <Box id="recaptcha-container"></Box>;
};

export default CaptchaVerifier;
