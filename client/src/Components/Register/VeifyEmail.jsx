import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import "./register.css";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

  const { token, userId } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.post(`${window.SERVER_URL}/api/v1/user/verify-email`, { 
          token, 
          userId,
        });
        if (response.data.statusCode === 200) {
          toast.success(response.data.message, {
            position: "top-center",
            closeButton: false,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 2500)
        }
      } catch (error) {
        console.error("Error verifying email:", error);
        toast.error(error.response.data.message, {
          position: "top-center",
          closeButton: false,
        });
      }
    };
  
    verifyEmail();
  }, []); 

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Card variant="outlined" sx={{ width: { xs: "95%", sm: "80%", md: "50%", lg: "30%" } }}>
          <Box elevation={0} style={{ padding: "32px", textAlign: "center" }}>
            <CircularProgress size="3rem" />
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default Register;
