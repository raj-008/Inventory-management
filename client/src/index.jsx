import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer />
    <App />
  </>
);
