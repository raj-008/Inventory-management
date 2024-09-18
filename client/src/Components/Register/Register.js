import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
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
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const isLoggedIn = localStorage.getItem("_authToken");

  if (isLoggedIn) {
    window.location.href = "/dashboard";
  }

  const [inpval, setInpval] = useState({
    fname: "",
    lname: "",
    company: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
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

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, lname, company, email, phone, password, cpassword } = inpval;

    if (fname === "") {
      toast.warning("First Name is required!", {
        position: "top-center",
      });
    } else if (lname === "") {
      toast.error("Last Name is required!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.error("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 6) {
      toast.error("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      try {
        const response = await axios.post("/register", {
          fname,
          lname,
          company,
          phone,
          email,
          password,
          cpassword,
        });

        const res = response.data;

        if (res.success) {
          toast.success("Registration Successfully done 😃!", {
            position: "top-center",
          });
          setInpval({ ...inpval, fname: "", lname: "", company: "", phone: "", email: "", password: "", cpassword: "" });
        }
      } catch (error) {
        toast.error(error.response.data.errors[0].msg, {
          position: "top-center",
        });
      }
    }
  };

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
              Register
            </Typography>

            <Grid container>
              <Grid item={true} xs={12} lg={6}>
                <TextField id="outlined-textarea-fname" label="First Name" name="fname" value={inpval.fname} onChange={setVal} className="register-input fname-input" />
              </Grid>
              <Grid item={true} xs={12} lg={6}>
                <TextField id="outlined-textarea-lname" label="Last Name" name="lname" value={inpval.lname} onChange={setVal} className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-company" label="Company Name" name="company" value={inpval.company} onChange={setVal} className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-email" label="Email" name="email" value={inpval.email} onChange={setVal} className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-phone" label="Phone" name="phone" value={inpval.phone} onChange={setVal} className="register-input" />
              </Grid>

              <FormControl sx={{ width: "25ch" }} className="register-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={inpval.password}
                  onChange={setVal}
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
                  type={showConfirmPassword ? "text" : "password"}
                  name="cpassword"
                  value={inpval.cpassword}
                  onChange={setVal}
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

              <Grid item xs={12}>
                <Button variant="contained" onClick={addUserdata} className="register-input register-btnp">
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
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Register;
