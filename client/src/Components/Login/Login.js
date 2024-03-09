import React from "react";
import Layout from "../Layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./login.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

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
                <TextField id="outlined-basic" variant="outlined" label="Email or Phone" className="login-input" />
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

              <Grid item xs={12}>
                <Button variant="contained" className="login-input login-btn">
                  Login
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
