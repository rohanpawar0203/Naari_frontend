import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: {
      Greet: "Hey, Welcome to Naari Website",
      askContactNumber: "Please enter your Contact Number",
      invalidNumber: "Please enter a valid Number",
      otpSent: "We have sent an OTP on {previousValue}, Please enter the OTP",
      invalidOtp: "Please enter a valid OTP",
      otpVerify: "OTP Verified",
      wrongOTP: "Wrong OTP",
      otpVerified: "Your otp is successfully verified",
      askFirstName: "Please enter your First Name",
      invalidFirstName: "Please enter valid First Name",
      askLastName: "Please enter your Last Name",
      invalidLastName: "Please enter valid Last Name",
      greetWithName: "Great {{firstName}} {{lastName}}, Nice to meet you",
      askEmailAddress: "Please enter your Email Address",
      invalidEmailAddress: "Please enter valid Email Address",
      chatBotPlaceholder: "Press Enter to Skip",
      askCompanyName: "Please enter your Company Name",
      invalidCompanyName: "Please enter valid Company Name",
      askRevenuePerYear: "Please enter your Per Year Revenue",
      invalidRevenue: "Please enter valid Per Year Revenue.",
      askGstIn: "Please enter your GST Number",
      invalidGST: "Please enter valid GST Number",
      askPanNumber: "Please enter your Pan Number",
      invalidPan: "Please enter valid PAN Number",
      askAadharNumber: "Please enter your Aadhar Number",
      invalidAadhar: "Please enter valid Aadhar Number",
      askAccountNumber: "Please enter your Account Number",
      invalidAccountNumber: "Please enter valid Account Number",
      askAccountName: "Please enter your Account Name",
      invalidAccountName: "Please enter valid Account Name",
      askIfscCode: "Please enter your IFSC code",
      invalidIFSC: "Please enter valid IFSC Code",
      registrationSuccessful: "Your Registration is Successful",
      login: "Lets Start the Login Process",
      loginSuccessful: "Your Login is Successful",
    },
  },
  hi: {
    translation: {
      Greet: "नमस्ते, नारी की वेबसाइट पर आपका स्वागत है।",
      askContactNumber: "कृपया अपना संपर्क नंबर दर्ज करें।",
      invalidNumber: "कृपया वैध नंबर दर्ज करें।",
      otpSent: "हमने {previousValue} पर एक OTP भेजा है, कृपया OTP दर्ज करें।",
      invalidOtp: "कृपया वैध OTP दर्ज करें।",
      otpVerify: "OTP सत्यापित",
      wrongOTP: "गलत OTP",
      otpVerified: "आपका OTP सफलतापूर्वक सत्यापित हुआ है।",
      askFirstName: "कृपया अपना पहला नाम दर्ज करें।",
      invalidFirstName: "कृपया वैध पहला नाम दर्ज करें।",
      askLastName: "कृपया अपना अंतिम नाम दर्ज करें।",
      invalidLastName: "कृपया वैध अंतिम नाम दर्ज करें।",
      greetWithName:
        "आपका स्वागत है {{firstName}} {{lastName}}, आपसे मिलकर खुशी हुई।",
      askEmailAddress: "कृपया अपना ईमेल पता दर्ज करें।",
      invalidEmailAddress: "कृपया वैध ईमेल पता दर्ज करें।",
      chatBotPlaceholder: "छोड़ने के लिए Enter दबाएँ।",
      askCompanyName: "कृपया अपना कंपनी का नाम दर्ज करें।",
      invalidCompanyName: "कृपया वैध कंपनी का नाम दर्ज करें।",
      askRevenuePerYear: "कृपया अपने वार्षिक राजस्व को दर्ज करें।",
      invalidRevenue: "कृपया वैध वार्षिक राजस्व दर्ज करें।",
      askGstIn: "कृपया अपना जीएसटी नंबर दर्ज करें।",
      invalidGST: "कृपया वैध जीएसटी नंबर दर्ज करें।",
      askPanNumber: "कृपया अपना पैन नंबर दर्ज करें।",
      invalidPan: "कृपया वैध पैन नंबर दर्ज करें।",
      askAadharNumber: "कृपया अपना आधार नंबर दर्ज करें।",
      invalidAadhar: "कृपया वैध आधार नंबर दर्ज करें।",
      askAccountNumber: "कृपया अपना खाता नंबर दर्ज करें।",
      invalidAccountNumber: "कृपया वैध खाता नंबर दर्ज करें।",
      askAccountName: "कृपया अपना खाता नाम दर्ज करें।",
      invalidAccountName: "कृपया वैध खाता नाम दर्ज करें।",
      askIfscCode: "कृपया अपना आईएफएससी कोड दर्ज करें।",
      invalidIFSC: "कृपया वैध आईएफएससी कोड दर्ज करें।",
      registrationSuccessful: "आपका पंजीकरण सफल हुआ है।",
      login: "आइए लॉगिन प्रक्रिया शुरू करें",
      loginSuccessful: "आपका लॉगिन सफल है",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("lang") || "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
