// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey1 = "AIzaSyAEVdGP__OtwskOz2eT9AhSMJWDKNGUESc";
const apiKey2 = "AIzaSyBmWutoWhDxVyKHq2UBWWPZUmY6-zEwiB8";
const apiKey3 = "AIzaSyByt2VRbWiypfFykRMBt6T6jbFQ2S14X9Y";
const apiKey4 = "AIzaSyBEBv7VgCke2kOk4MXNHa-d4oMaOXwvvoA";
const firebaseConfig = {
  apiKey: "AIzaSyAEVdGP__OtwskOz2eT9AhSMJWDKNGUESc",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
