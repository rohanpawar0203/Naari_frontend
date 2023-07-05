import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import ChatbotLogin from "./pages/ChatbotLogin/ChatbotLogin";
import ChatbotSignup from "./pages/ChatbotSignup/ChatbotSignup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatBotSignup" element={<ChatbotSignup />} />
        <Route path="/ChatbotLogin" element={<ChatbotLogin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
