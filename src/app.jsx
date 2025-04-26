// App.jsx
import React from "react";
import { AuthProvider } from "./contexts/authContext/index.jsx";
import Home from "./components/home/index.jsx";
import Login from "./components/auth/login/index.jsx";
import Register from "./components/auth/register/index.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./components/home/index.jsx";
import Landing from "./components/landing/index.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
