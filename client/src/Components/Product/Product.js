import React, { useState } from "react";
import Layout from "../Layout/Layout";
import CustomTable from "../Custom/CustomTable";
import productTableColumns, { ActionButton } from "../../Components/Product/ProductTableColumns";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const Product = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData("/api/v1/product", refreshKey);
  const products = data.data || [];

  const { token } = useAuth();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/api/v1/product/delete/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status) {
        successToaster(response.data.message);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  const tableColumns = productTableColumns(navigate, handleDelete);

  return (
    <>
      <Layout>
        <CustomTable tableData={products} tableColumns={tableColumns} actionButton={<ActionButton />} defultSortingColumn="7" />
      </Layout>
    </>
  );
};

export default Product;
