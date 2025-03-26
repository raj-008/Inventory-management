import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {
  const user = useAuth();
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async ({ email, password }) => {
    user.loginAction({ email, password });
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Card variant="outlined" sx={{ width: { xs: "95%", sm: "80%", md: "50%", lg: "30%" } }}>
          <CardContent sx={{ width: "100%" }}>
            <Typography variant="h6" style={{ textAlign: "center", paddingBottom: "22px" }} color="text.secondary" gutterBottom>
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <Grid container>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    variant="outlined"
                    {...register("email", {
                      required: { value: true, message: "Email field is required" },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    label="Email or Phone"
                    className="login-input"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl className="register-input" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: { value: true, message: "Password field is required" } })}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.password}
                    />
                    {errors.password && <FormHelperText sx={{ color: "red" }}>{errors.password.message}</FormHelperText>}
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot Password ?
                    </Link>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button variant="contained" type="submit" className="login-input login-btn">
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
            </form>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Login;
