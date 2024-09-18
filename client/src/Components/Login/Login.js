import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./login.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const navigate = useNavigate();

  const loginuser = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    if (email === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("Password is required!", {
        position: "top-center",
      });
    } else {
      try {
        const data = await axios.post("/login", {
          email,
          password,
        });

        const result = data.data;

        if (result.status === 201) {
          localStorage.setItem("_authToken", result.token);
          navigate("/dashboard");
          setInpval({ ...inpval, email: "", password: "" });
        }
      } catch (error) {
        if (error && error.response.data.errors) {
          toast.error(error.response.data.errors[0].msg, {
            position: "top-center",
            closeButton: false,
          });
        }

        toast.error(error.response.data.message, {
          position: "top-center",
          closeButton: false,
        });
      }
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              Login
            </Typography>

            <Grid container>
              <Grid item xs={12}>
                <TextField id="outlined-basic" variant="outlined" name="email" onChange={setVal} defaultValue={inpval.email} label="Email or Phone" className="login-input" />
              </Grid>

              <FormControl sx={{ width: "25ch" }} className="register-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={setVal}
                  defaultValue={inpval.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password ?
                </Link>
              </FormControl>

              <Grid item xs={12}>
                <Button variant="contained" onClick={loginuser} className="login-input login-btn">
                  Login
                </Button>
                <div className="already-account-note ">
                  Are you new user?
                  <Link to="/register" className="already-note-link">
                    Create Account
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
