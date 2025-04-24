import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Forbidden from "./ErrorPage/Forbidden"
import { Box, CircularProgress } from "@mui/material";

const UserProtectedRoute = () => {
  const {token, user, loading} = useAuth();

  if(loading) return (
    <Box elevation={0}  style={{
      height: '100vh', // makes the Box fill the full viewport height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column' // optional, in case you add more content later
    }}>
      <CircularProgress size="3rem" />
    </Box>
);

  if (!token ||  (user.user && user.user.role != "user")) return <Forbidden />;
  return <Outlet />;
};

export default UserProtectedRoute;
