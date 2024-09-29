import React, { useState } from "react";
import Layout from "../Layout/Layout";
import CustomTable from "../Custom/CustomTable";
import BillDetails from "./BillDetails";
import useFetchData from "../../hooks/useFetchData";
import billTableColumns, { ActionButton } from "./BillTableColumns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";

function Bill() {
  const [billData, setBillData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = async (id) => {
    try {
      const response = await axios.get(`${window.SERVER_URL}/api/v1/bill/details/` + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setBillData(response.data.data);
    } catch (error) {
      console.log(error);
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const { token } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/bill`, refreshKey);
  const bills = data.data || [];

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${window.SERVER_URL}/api/v1/bill/delete/` + id, {
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

  const tableColumns = billTableColumns(navigate, handleClose, handleOpen, handleDelete);
  return (
    <>
      <Layout>
        <CustomTable tableData={bills} tableColumns={tableColumns} actionButton={<ActionButton />} defultSortingColumn="5" />
        <BillDetails open={open} handleClose={handleClose} billData={billData} />
      </Layout>
    </>
  );
}

export default Bill;
