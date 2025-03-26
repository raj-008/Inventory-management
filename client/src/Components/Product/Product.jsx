import React, { useState } from "react";
import Layout from "../Layout/Layout";
import CustomTable from "../Custom/CustomTable";
import productTableColumns, { ActionButton } from "./ProductTableColumns";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const Product = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/product`, refreshKey);
  const products = data.data || [];

  const { token } = useAuth();

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${window.SERVER_URL}/api/v1/product/delete/` + id, {
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

  const handleExcelImport = async (file, event) => {
    try {
      const formData = new FormData();
      formData.append("excel", file);

      const response = await axios.post(`${window.SERVER_URL}/api/v1/product/import`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        }
      });
  
      if (response.data.status) {
        successToaster(response.data.message);
        setRefreshKey((prev) => prev + 1);
      }

    } catch (error) {
      errorToaster(error.response.data.message);
    }
    event.target.value = "";
  };
  
  return (
    <>
      <Layout>
        <CustomTable tableData={products} tableColumns={tableColumns} actionButton={<ActionButton handleExcelImport={handleExcelImport} />} defultSortingColumn="7" />
      </Layout>
    </>
  );
};

export default Product;
