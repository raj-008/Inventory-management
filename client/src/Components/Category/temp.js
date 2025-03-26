import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import CustomTable from "../Custom/CustomTable";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/AuthContext";
import { errorToaster, successToaster } from "../../Utils/Toasters.utils";
import useFetchData from "../../hooks/useFetchData";
import CategoryModal from "./CategoryModal";
import categoryTableColumns, { ActionButton } from "./CategoryTableColumns";

const Category = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();  

  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/category`, refreshKey);
  const categories = data.data || [];

  const [editFormData, setEditFormData] = useState({ name: "", id: "" });
  const [isEdit, setIsEdit] = useState(false);
  const { token } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${window.SERVER_URL}/api/v1/category/delete/${id}`, {
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
      const response = await axios.get(`${window.SERVER_URL}/api/v1/category/edit/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
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

  const createCategorySubmit = async (data) => {
    try {
      const response = await axios.post(`${window.SERVER_URL}/api/v1/category/create`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status) {
        successToaster(response.data.message);
        setRefreshKey((prev) => prev + 1);
        handleClose();
      }
    } catch (error) {
      errorToaster(error.response.data.message);
    }
  };

  const updateCategorySubmit = async (data) => {
    try {
      const response = await axios.post(`${window.SERVER_URL}/api/v1/category/update/` + editFormData.id, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

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
      updateCategorySubmit(data);
    } else {
      createCategorySubmit(data);
    }
  };

  const tableColumns = categoryTableColumns(handleEdit, handleDeleteCategory);

  return (
    <>
      <Layout>
          <CategoryModal open={open} onClose={handleClose} isEdit={isEdit} editFormData={editFormData} onSubmit={handleSubmit(onSubmit)} register={register} errors={errors} />
          <CustomTable tableData={categories} tableColumns={tableColumns} actionButton={<ActionButton setIsEdit={setIsEdit} handleOpen={handleOpen} />} defultSortingColumn="2" />
      </Layout>
    </>
  );
};

export default Category;
