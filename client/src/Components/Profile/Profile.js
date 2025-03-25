import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";

function CreateProduct() {
  const [updatedUser, setUpdatedUser] = useState("");

  const { token, user } = useAuth();
  const companyName = user.company;
  const firstName = user.fname;
  const lastName = user.lname;
  const email = user.email;
  const phone = user.phone;
  const userId = user._id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      company: companyName,
      fname: firstName,
      lname: lastName,
      email: email,
      phone: phone,
    },
  });

  const onSubmit = async (data) => {
    data.id = userId;
    try {
      const response = await axios.put("/api/v1/user/update", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status) {
        if (response.data && response.data.data) {
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(response.data.data));
          setUpdatedUser(response.data.data);
        }
        successToaster(response.data.message);
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  return (
    <>
      <Layout updatedUser={updatedUser}>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Company"
                  variant="outlined"
                  {...register("company", { required: { value: true, message: "Company Name is required" } })}
                  helperText={errors.company ? errors.company.message : ""}
                  error={!!errors.company}
                />
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}></Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  {...register("fname", { required: { value: true, message: "First Name is required" } })}
                  helperText={errors.fname ? errors.fname.message : ""}
                  error={!!errors.fname}
                />
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  {...register("lname", { required: { value: true, message: "Last Name is required" } })}
                  helperText={errors.lname ? errors.lname.message : ""}
                  error={!!errors.lname}
                />
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...register("email", { required: { value: true, message: "Email is required" } })}
                  helperText={errors.email ? errors.email.message : ""}
                  error={!!errors.email}
                />
              </Grid>

              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  {...register("phone", { required: { value: false }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.phone ? errors.phone.message : ""}
                  error={!!errors.phone}
                />
              </Grid>

              <Grid size={{ xs: 6 }}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Layout>
    </>
  );
}

export default CreateProduct;
