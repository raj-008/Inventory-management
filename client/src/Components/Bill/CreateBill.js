import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import GenerateBillNumber from "../../Utils/GenerateBillNumber";
import axios from "axios";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import { useNavigate } from "react-router-dom";
import CreateBillRows from "../Bill/CreateBillRows";

function CreateBill() {
  const { register, handleSubmit, watch, setValue, getValues, control, formState: { errors }} = useForm({
    defaultValues: {
      bill_number: GenerateBillNumber(),
      date: new Date().toLocaleDateString("en-GB").split("/").join("-"),
      customer_name: "",
      items: [{ product_id: "", qty: 0, price: 0 }],
      total_amount: 0,
      tax: 0,
    },
  });

  const navigate = useNavigate();

  const { token } = useAuth();

  const [productData, productError, productLoading] = useFetchData("/api/v1/product", 0);
  const products = productData?.data || [];

  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    setValue("total_amount", grandTotal, { shouldValidate: true, shouldDirty: true });
  }, [grandTotal, setValue]);

  const onSubmit = async (data) => {

    const [day, month, year] = data.date.split("-");
    data.date = new Date(`${year}-${month}-${day}T00:00:00Z`);

    if(!data.tax) data.tax = 0;

    try {
      const response = await axios.post(
        `${window.SERVER_URL}/api/v1/bill/create`,
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

  return (
    <>
      <Layout>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 3 }}>
                <TextField fullWidth id="outlined-basic" label="Bill Number" variant="outlined" {...register("bill_number", { required: { value: true, message: "Bill Number is required" } })} helperText={errors.bill_number ? errors.bill_number.message : ""} error={!!errors.bill_number} />
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}>
                <TextField fullWidth id="outlined-basic" label="Date" variant="outlined" {...register("date", { required: { value: true, message: "Date is required" } })} helperText={errors.date ? errors.date.message : ""} error={!!errors.date} />
              </Grid>
              <Grid size={{ sm: 12, md: 3 }}></Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField fullWidth id="outlined-basic" label="Customer Name" variant="outlined" {...register("customer_name", { required: { value: true, message: "Customer Name is required" } })} helperText={errors.customer_name ? errors.customer_name.message : ""} error={!!errors.customer_name} />
              </Grid>

              {/* Product Append */}
              <Grid size={{ sm: 12, md: 12 }}>
                <CreateBillRows products={products} setGrandTotal={setGrandTotal} control={control} register={register} handleChange={handleChange} watch={watch} errors={errors} />
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

export default CreateBill;
