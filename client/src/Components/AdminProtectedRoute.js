import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Forbidden from "../Components/ErrorPage/Forbidden";

const AdminProtectedRoute = () => {
  const user = useAuth();
  if (!user.token || (user.user && user.user.role != "admin")) return <Forbidden />;
  return <Outlet />;
};

export default AdminProtectedRoute;
