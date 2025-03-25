import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./forgotpassword.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

  const [email, setEmail] = useState();

  const setValidEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const resposne = await axios.post(`${window.SERVER_URL}/api/v1/user/forgot-password`, {
        email,
      });
      console.log(resposne);
      if (resposne && resposne.data.success) {
        console.log(resposne);
        toast.success(resposne.data.message, {
          position: "top-center",
          closeButton: false,
        });
      }
    } catch (error) {
      console.log("Error :", error);
      if (error && !error.response.data.success) {
        toast.error(error.response.data.message, {
          position: "top-center",
          closeButton: false,
        });
      }
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Card variant="outlined" sx={{ width: { xs: "95%", sm: "80%", md: "50%", lg: "30%" } }}>
          <CardContent sx={{ width: "100%" }}>
            <Typography variant="h6" style={{ textAlign: "center", paddingBottom: "22px"}} color="text.secondary" gutterBottom>
              Forgot Password ?
            </Typography>

            <Typography style={{ textAlign: "center", marginBottom: "22px"}} color="text.secondary" gutterBottom>
              We will send you verification email to verify your account
            </Typography>

            <Grid container>
              <Grid item xs={12}>
                <TextField id="outlined-basic" variant="outlined" label="Email" onChange={setValidEmail} className="forgot-input" />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" onClick={handleForgotPassword} className="login-input login-btn">
                  Send Email
                </Button>
                <div className="already-account-note ">
                  <Link to="/login" className="already-note-link">
                    Back to Login
                  </Link>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
