import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./forgotpassword.css";
import Button from "@mui/material/Button";

const Login = () => {
  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Card variant="outlined" sx={{ width: { xs: "95%", sm: "80%", md: "50%", lg: "30%" } }}>
          <CardContent sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                paddingBottom: "22px",
              }}
              color="text.secondary"
              gutterBottom
            >
              Forgot Password ?
            </Typography>

            <Typography
              style={{
                textAlign: "center",
                marginBottom: "22px",
              }}
              color="text.secondary"
              gutterBottom
            >
              We will send you verification email to verify your account
            </Typography>

            <Grid container>
              <Grid item xs={12}>
                <TextField id="outlined-basic" variant="outlined" label="Email" className="forgot-input" />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" className="login-input login-btn">
                  Send Email
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
