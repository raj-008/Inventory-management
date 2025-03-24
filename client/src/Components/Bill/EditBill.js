import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import EditBillRows from "./EditBillRows";
import CircularProgress from '@mui/material/CircularProgress';

function EditBill() {
  const navigate = useNavigate();

   const [grandTotal, setGrandTotal] = useState(0);

  const { token } = useAuth();

  const { id } = useParams();

  const [refreshKey, setRefreshKey] = useState(0);

  const [productData, productError, productLoading] = useFetchData(`${window.SERVER_URL}/api/v1/product`, 0);
  const products = productData?.data || [];

  const [billData, billError, billLoading] = useFetchData(`${window.SERVER_URL}/api/v1/bill/details/` + id, 0);
  const bill = billData?.data || [];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm();



  useEffect(() => {
    if (bill && !billLoading && bill.date) {
      const date = new Date(bill.date);
      const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
      const billNumber = bill.bill_number;
      
      setValue("bill_number", billNumber);
      setValue("date", formattedDate);
      setValue("customer_name", bill.customer_name || "");
      setValue("items", bill.billproducts);
      setValue("tax", bill.tax || 0);
      setValue("total_amount", bill.total_amount);
    }

  }, [bill, setValue]);

  useEffect(() => {
    setValue("total_amount", grandTotal, { shouldValidate: true, shouldDirty: true });
  }, [grandTotal, setValue]);

  const onSubmit = async (data) => {

    const [day, month, year] = data.date.split("-");
    data.date = new Date(`${year}-${month}-${day}T00:00:00Z`);

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


  const handleChange = (index, field, value) => {
    const items = [...getValues("items")];

    const selectedProduct = products.find((p) => p._id === value);
    items[index].product_id = value;
    items[index].price = selectedProduct ? selectedProduct.amount : 0;
    items[index].qty = 1; // Default quantity to 1 when product is selected
    setValue("items", items);
  };


  if (billLoading) {
    return (
        <Box elevation={0} style={{ padding: "32px", textAlign: "center" }}>
          <CircularProgress size="3rem" />
        </Box>
    );
  }
  
  return (
    <>
      <Layout>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 3 }}>
                <TextField fullWidth id="outlined-basic" label="Bill Number" variant="outlined" {...register("bill_number", { required: { value: true, message: "Bill Number is required" } })} helperText={errors.bill_number ? errors.bill_number.message : ""} error={!!errors.bill_number} disabled />
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <TextField fullWidth label="Date" variant="outlined" {...register("date", { required: { value: true, message: "Date is required" } })} helperText={errors.date ? errors.date.message : ""} error={!!errors.date} disabled />
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}></Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField fullWidth label="Customer Name" variant="outlined" {...register("customer_name", { required: { value: true, message: "Customer Name is required" } })} helperText={errors.customer_name ? errors.customer_name.message : ""} error={!!errors.customer_name} />
              </Grid>

              {/* Product Append */}
              <Grid size={{ sm: 12, md: 12 }}>
                <EditBillRows products={products} setGrandTotal={setGrandTotal} control={control} register={register} handleChange={handleChange} watch={watch} errors={errors} />
              </Grid>

              <Grid size={{ sm: 12, md: 9 }}></Grid>

              <Grid size={{ sm: 12, md: 3 }}>
                <TextField fullWidth label="Discount/Surcharge" type="number" variant="outlined" {...register("tax", { valueAsNumber: true })} />
              </Grid>

              <Grid size={{ sm: 12, md: 9 }}></Grid>

              <Grid size={{ sm: 12, md: 3 }}>
                <Typography variant="h6" gutterBottom>{`Total : ${grandTotal}`}</Typography>
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
