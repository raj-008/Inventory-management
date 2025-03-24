import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

function EditProduct() {
  const { token } = useAuth();

  const navigate = useNavigate();

  const { id } = useParams();

  const [productData, productError, productLoading] = useFetchData(`${window.SERVER_URL}/api/v1/product/edit/` + id, 0);
  const product = productData?.data || [];

  const [categoryData, categoryError, categoryLoading] = useFetchData(`${window.SERVER_URL}/api/v1/category`, 0);
  const categories = categoryData?.data || [];

  const [brandData, brandError, brandLoading] = useFetchData(`${window.SERVER_URL}/api/v1/brand`, 0);
  const brands = brandData?.data || [];

  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    defaultValues: {
      name: "",
      category_id: "",
      brand_id: "",
      qty: 0,
      amount: 0,
      unit : "",
      description : "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        category_id: product.category_id || "",
        brand_id: product.brand_id || "",
        qty: product.qty || "",
        amount: product.amount || "",
        unit: product.unit || "",
        description: product.description || "",
      });
    }
  }, [product, reset]);

  const onSubmit = async (data) => {

    if(!data.category_id) data.category_id = "";
    if(!data.brand_id) data.brand_id = "";
    
    try {
      const response = await axios.post(
        `${window.SERVER_URL}/api/v1/product/update/` + id,
        { ...data, status: 1 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status) {
        successToaster(response.data.message);
        navigate("/product");
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  if (productLoading) {
    return;
  }

  return (
    <>
      <Layout>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  defaultValue={product.name}
                  {...register("name", { required: { value: true, message: "Product Name is required" } })}
                  helperText={errors.name ? errors.name.message : ""}
                  error={!!errors.name}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    defaultValue={product.category_id}
                    label="Select Category"
                    {...register("category_id", { required: { value: true, message: "Category  is required" } })}
                    error={!!errors.category_id}
                  >
                    <MenuItem value={0}>Select Category</MenuItem>
                    {categories.map((category) => {
                      return (
                        <MenuItem value={category._id} key={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.category_id && <FormHelperText sx={{ color: "red" }}>{errors.category_id.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Select Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    label="Select Brand"
                    defaultValue={product.brand_id}
                    {...register("brand_id", { required: { value: true, message: "Brand  is required" } })}
                    error={!!errors.brand_id}
                  >
                    <MenuItem value={0}>Select Brand</MenuItem>
                    {brands.map((brand) => {
                      return (
                        <MenuItem value={brand._id} key={brand._id}>
                          {brand.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.brand_id && <FormHelperText sx={{ color: "red" }}>{errors.brand_id.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Quantity / Stock"
                  variant="outlined"
                  {...register("qty", { required: { value: true, message: "Quantity  is required" }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.qty ? errors.qty.message : ""}
                  error={!!errors.qty}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  defaultValue={product.amount}
                  {...register("amount", { required: { value: true, message: "Price  is required" }, pattern: { value: /^[0-9]+$/, message: "Only numbers are allowed" } })}
                  helperText={errors.amount ? errors.amount.message : ""}
                  error={!!errors.amount}
                />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField fullWidth label="Unit" variant="outlined" {...register("unit", { required: { value: false } })} />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}>
                <TextField fullWidth label="Descriptipn" variant="outlined" {...register("description", { required: { value: false } })} />
              </Grid>
              <Grid size={{ sm: 12, md: 6 }}></Grid>

              <Grid size={{ xs: 6 }}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Link to="/product">
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

export default EditProduct;
