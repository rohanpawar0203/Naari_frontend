// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEqAPaRgKj2xrx6dFtsaabuZqfh032X54",
  authDomain: "naari-11edd.firebaseapp.com",
  projectId: "naari-11edd",
  storageBucket: "naari-11edd.appspot.com",
  messagingSenderId: "968750486102",
  appId: "1:968750486102:web:4676f1e9932e261a0721f7",
  measurementId: "G-FK0EVFEYVG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
