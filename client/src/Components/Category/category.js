import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import Layout from "../Layout/Layout";
import { Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Grid } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import { TextField, FormControl, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Category = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
  });

  const [categories, setCategories] = useState([]);
  const [modelTitle, setModelTitle] = useState("");

  const defaultMaterialTheme = createTheme();
  const [open, setOpen] = React.useState(false);

  const handleOpen = (title) => {
    if (title == "Add Category") {
      setFormData({
        name: "",
        id: "",
      });
    }

    setOpen(true);
    setModelTitle(title);
  };
  const handleClose = () => setOpen(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("category");

      if (response.data.success) {
        setCategories([...response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`category/delete/${id}`);

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
        });

        fetchCategories();
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const { name } = formData;

    try {
      const response = await axios.post("category/create", {
        name: name,
      });

      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
        });

        fetchCategories();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, {
        position: "top-center",
      });
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`/category/edit/${id}`);

      if (response.data.success) {
        setFormData({
          name: response.data.data[0]["name"],
          id: response.data.data[0]["_id"],
        });
      }
    } catch (error) {
      toast.error(error.response.data.errors[0].msg, {
        position: "top-center",
      });
    }

    handleOpen("Edit Category");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { name, id } = formData;

    const response = await axios.post("category/update/" + id, {
      name: name,
    });

    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-center",
      });

      fetchCategories();
      handleClose();
    }
  };

  return (
    <>
      <Layout>
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" sx={{ mb: 3 }} component="h2">
                  {modelTitle}
                </Typography>
                <form onSubmit={modelTitle == "Add Category" ? handleSave : handleUpdate}>
                  <TextField label="Category" value={formData.name} name="name" required variant="outlined" color="primary" type="text" onChange={handleInputChange} sx={{ mb: 3 }} fullWidth />
                  <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                  </Grid>
                </form>
              </Box>
            </Fade>
          </Modal>

          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              columns={[{ title: "Category", field: "name" }]}
              data={categories}
              actions={[
                (rowData) => ({
                  icon: "edit",
                  tooltip: "Edit Category",
                  onClick: (event) => handleEdit(rowData._id),
                }),
                (rowData) => ({
                  icon: "delete",
                  tooltip: "Delete Category",
                  onClick: (event, rowData) => handleDeleteCategory(rowData._id),
                  // disabled: rowData.birthYear < 2000,
                }),
                {
                  icon: "add",
                  tooltip: "Add Category",
                  isFreeAction: true,
                  onClick: (event) => handleOpen("Add Category"),
                },
              ]}
              options={{
                showTitle: false,
                actionsColumnIndex: -1,
                sorting: true,
                searchFieldAlignment: "left",
              }}
            />
          </ThemeProvider>
        </div>
      </Layout>
    </>
  );
};

export default Category;
