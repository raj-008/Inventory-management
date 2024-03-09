import React from "react";
import Layout from "../Layout/Layout";
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

const Register = () => {
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
                <TextField id="outlined-textarea-fname" label="First Name" className="register-input fname-input" />
              </Grid>
              <Grid item={true} xs={12} lg={6}>
                <TextField id="outlined-textarea-lname" label="Last Name" className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-company" label="Company Name" className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-email" label="Email" className="register-input" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-textarea-phone" label="Phone" className="register-input" />
              </Grid>

              <FormControl sx={{ width: "25ch" }} className="register-input" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
                <Button variant="contained" className="register-input register-btnp">
                  Register
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default Register;
