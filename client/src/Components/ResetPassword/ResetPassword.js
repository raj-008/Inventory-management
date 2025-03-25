import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

  const { token, userId } = useParams();

  const [input, setInputValue] = useState({
    password: "",
    cpassword: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleResetPasswordInput = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${window.SERVER_URL}/api/v1/user/reset-password`, {
        password: input.password,
        cpassword: input.cpassword,
        token: token,
        userId: userId,
      });

      if (response.data.statusCode === 200) {
        window.location.href = "/login";
        toast.success(response.data.message, {
          position: "top-center",
          closeButton: false,
        });
      }
    } catch (error) {
      if (error && error.response.data.errors) {
        toast.error(error.response.data.errors[0].msg, {
          position: "top-center",
          closeButton: false,
        });
      }

      if (error && error.response && !error.response.data.success) {
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
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                paddingBottom: "22px",
              }}
              color="text.secondary"
              gutterBottom
            >
              Reset Password
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl sx={{ width: "25ch" }} className="register-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={input.password}
                  onChange={handleResetPasswordInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControl sx={{ width: "100%" }} className="register-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" autoFocus>
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  name="cpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={input.cpassword}
                  onChange={handleResetPasswordInput}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>

              <Grid item xs={12} style={{ marginTop: "26px" }}>
                <Button type="submit" variant="contained" className="register-input register-btnp">
                  Save
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Register;
