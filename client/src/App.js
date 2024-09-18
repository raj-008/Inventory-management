import React from "react";
import Home from "./Components/Home/Home";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Setting from "./Components/Setting/Setting";
import Category from "./Components/Category/category";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

const App = () => {
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token/:userId" element={<ResetPassword />} />
            <Route path="*" element={<Home />} />

            {/* <Route path="/invoice" element={<Invoice />} /> */}
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </>
  );
};

export default App;
