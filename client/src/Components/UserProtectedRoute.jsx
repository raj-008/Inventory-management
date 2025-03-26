import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Forbidden from "./ErrorPage/Forbidden"

const UserProtectedRoute = () => {
  const user = useAuth();
  if (!user.token ||  (user.user && user.user.role != "user")) return <Forbidden />;
  return <Outlet />;
};

export default UserProtectedRoute;
