import { React } from "react";
import Layout from "../Layout/Layout";
import CustomTable from "../Custom/CustomTable";
import BrandModal from "./BrandModal";
import brandTableColumns, { ActionButton } from "./BrandTableColumns";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import useFetchData from "../../hooks/useFetchData";

const Brand = () => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/brand`, refreshKey);
  const brands = data.data || [];
  const [editFormData, setEditFormData] = useState({ name: "", id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const { token } = useAuth();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${window.SERVER_URL}/api/v1/brand/delete/${id}`, {
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

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`api/v1/brand/edit/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.status) {
        setEditFormData({
          name: response.data.data.name,
          id: response.data.data._id,
        });
        handleOpen();
        setIsEdit(true);
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  const createBrandSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${window.SERVER_URL}/api/v1/brand/create`,
        { ...data, status: 1 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status) {
        successToaster(response.data.message);
        setRefreshKey((prev) => prev + 1);
        handleClose();
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  const updateBrandSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${window.SERVER_URL}/api/v1/brand/update/` + editFormData.id,
        { ...data, status: 1 },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.status) {
        successToaster(response.data.message);
        handleClose();
        setRefreshKey((prevVal) => prevVal + 1);
      }
    } catch (error) {
      console.log(error);
      errorToaster(error.response.data.message);
    }
  };

  const onSubmit = async (data) => {
    if (isEdit) {
      updateBrandSubmit(data);
    } else {
      createBrandSubmit(data);
    }
  };

  const tableColumns = brandTableColumns(handleEdit, handleDelete);
  return (
    <>
      <Layout>
        <BrandModal open={open} onClose={handleClose} isEdit={isEdit} editFormData={editFormData} onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
        <CustomTable tableData={brands} tableColumns={tableColumns} actionButton={<ActionButton setIsEdit={setIsEdit} handleOpen={handleOpen} defultSortingColumn="2" />} />
      </Layout>
    </>
  );
};

export default Brand;
