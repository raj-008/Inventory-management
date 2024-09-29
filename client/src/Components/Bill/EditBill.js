import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function EditBill() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { token } = useAuth();

  const { id } = useParams();

  const [productData, productError, productLoading] = useFetchData(`${window.SERVER_URL}/api/v1/product`, 0);
  const products = productData?.data || [];

  const [billData, billError, billLoading] = useFetchData(`${window.SERVER_URL}/api/v1/bill/details/` + id, 0);
  const bill = billData?.data || [];

  useEffect(() => {
    if (bill) {
      reset({
        product_id: bill.product_id || "",
        qty: bill.qty || "",
        total_amount: bill.total_amount || "",
        tax: bill.tax || "",
      });
    }
  }, [bill, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "/api/v1/bill/update/" + id,
        { ...data },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status) {
        successToaster(response.data.message);
        navigate("/bill");
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  if(billLoading) {
    return;
  }

  return (
    <>
      <Layout>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <Typography variant="h6" component="h6">
                  Bill No : {bill.bill_number}
                </Typography>
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <FormControl fullWidth sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Product</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Select Product"
                    defaultValue={bill.product_id}
                    {...register("product_id", { required: { value: true, message: "Product is Required" } })}
                  >
                    <MenuItem value={0}>Select Product</MenuItem>
                    {products.map((product) => {
                      return (
                        <MenuItem value={product._id} key={product._id}>
                          {product.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.product_id && <FormHelperText sx={{ color: "red" }}>{errors.product_id.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  {...register("qty", { required: { value: true, message: "Quantity is required" }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.qty ? errors.qty.message : ""}
                  error={!!errors.qty}
                  defaultValue={bill.qty}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Tax"
                  variant="outlined"
                  {...register("tax", { required: { value: true, message: "Bill Number is required" }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.tax ? errors.tax.message : ""}
                  error={!!errors.tax}
                  defaultValue={bill.tax}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Total Amount"
                  variant="outlined"
                  {...register("total_amount", { required: { value: true, message: "Bill Number is required" }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.total_amount ? errors.total_amount.message : ""}
                  error={!!errors.total_amount}
                  defaultValue={bill.total_amount}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Link to="/bill">
                  <Button variant="contained" sx={{ m: 2, backgroundColor: "black" }}>
                    Back
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Layout>
    </>
  );
}

export default EditBill;
