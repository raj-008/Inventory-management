import React from "react";
import Home from "./Components/Home/Home";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import Setting from "./Components/Setting/Setting";
import Category from "./Components/Category/category";

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
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </>
  );
};

export default App;
