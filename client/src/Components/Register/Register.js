import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import "./register.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";

const Register = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

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

  const { register, handleSubmit, watch, formState: { errors }} = useForm();

  const password = watch("password", "");

  const onRegisterSubmit = async ({ fname, lname, company, phone, email, password, cpassword }) => {
    try {
      const response = await axios.post(`${window.SERVER_URL}/api/v1/register`, { fname, lname, company, phone, email, password, cpassword });

      if (response.data.status) {
        toast.success("Registration Successful, We have sent you verification email 😃!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "100vh" }}>
        <Card variant="outlined" sx={{ width: { xs: "95%", sm: "80%", md: "50%", lg: "30%" } }}>
          <CardContent sx={{ width: "100%" }}>
            <Typography variant="h6" style={{ textAlign: "center", paddingBottom: "22px" }} color="text.secondary" gutterBottom>
              Register
            </Typography>
            <form method="post" onSubmit={handleSubmit(onRegisterSubmit)}>
              <Grid container>
                <Grid size={6}>
                  <TextField
                    label="First Name"
                    {...register("fname", {
                      required: { value: true, message: "First Name is required" },
                      minLength: { value: 3, message: "First Name should be at least 3 character" },
                    })}
                    className="register-input fname-input"
                    error={!!errors.fname}
                    helperText={errors.fname ? errors.fname.message : ""}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    {...register("lname", {
                      required: { value: true, message: "Last Name is required" },
                      minLength: { value: 3, message: "Last Name should be at least 3 character" },
                    })}
                    label="Last Name"
                    className="register-input"
                    error={!!errors.lname}
                    helperText={errors.lname ? errors.lname.message : ""}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    {...register("company", {
                      required: { value: true, message: "Company Name is required" },
                      minLength: { value: 3, message: "Company Name should be at least 3 character" },
                    })}
                    error={!!errors.company}
                    helperText={errors.company ? errors.company.message : ""}
                    label="Company Name"
                    className="register-input"
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      minLength: { value: 3, message: "Email should be at least 3 character" },
                    })}
                    label="Email"
                    className="register-input"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    {...register("phone", {
                      minLength: { value: 10, message: "Phone Number should be at least 10" },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                    label="Phone"
                    className="register-input"
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl className="register-input" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: { value: true, message: "Password is required" },
                        minLength: { value: 6, message: "Password should be at least 6 character" },
                      })}
                      error={!!errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {errors.password && <FormHelperText sx={{ color: "red" }}>{errors.password.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <FormControl className="register-input" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" autoFocus>
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("cpassword", {
                        required: { value: true, message: "Confirm Password is required" },
                        minLength: { value: 6, message: "Confirm Password should be at least 6 character" },
                        validate: (value) => value === password || "Password & Confirm password does not match",
                      })}
                      error={!!errors.cpassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownConfirmPassword} edge="end">
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    {errors.cpassword && <FormHelperText sx={{ color: "red" }}>{errors.cpassword.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid size={12}>
                  <Button variant="contained" type="submit" className="register-input register-btnp">
                    Register
                  </Button>
                  <div className="already-account-note ">
                    Already have an account ?
                    <Link to="/login" className="already-note-link">
                      Login
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

export default Register;
