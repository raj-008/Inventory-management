import React from "react";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Tooltip from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const productTableColumns = (navigate, handleDelete, handleExcelImport) => [
  {
    name: "Name",
    selector: (row) => row.name,
    searchable: true,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.categories.name,
    sortable: true,
    center: "true",
    searchable: true,
  },
  {
    name: "Company",
    selector: (row) => row.brands.name,
    sortable: true,
    center: "true",
    searchable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.qty + " " + row.unit,
    sortable: true,
    center: "true",
    searchable: true,
  },
  {
    name: "Price",
    selector: (row) => "$" + row.amount,
    sortable: true,
    center: "true",
    searchable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
    center: "true",
  },

  {
    name: "Created At",
    selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
    sortable: true,
    center: "true",
  },
  {
    name: "Action",
    cell: (row) => (
      <Grid sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1}}>
        <IconButton
          variant="contained"
          value={row._id}
          onClick={(e) => {
            navigate("/product/edit/" + row._id);
          }}
          style={{ marginRight: "8px" }}
        >
          <ModeIcon style={{ color: "#8080ff" }} />
        </IconButton>
        <IconButton
          variant="contained"
          value={row.id}
          onClick={() => {
            handleDelete(row._id);
          }}
        >
          <DeleteIcon style={{ color: "#ff8080" }} />
        </IconButton>
      </Grid>
    ),
    center: "true",
  },
];

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



export const ActionButton = ({ handleExcelImport }) => {
  return (
    <>
    <Box  sx={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
      <Link to="/product/create">
        <IconButton variant="text">
          <LibraryAddIcon style={{ fontSize: "32px", color: "#737373" }} />
        </IconButton>
      </Link>
        <Tooltip title="Excel Import">
          <Button component="label" role={undefined} tabIndex={-1}>
            <UploadFileIcon style={{ fontSize: "32px", color: "#737373" }} />
            <VisuallyHiddenInput type="file" accept=".xls, .xlsx"  onChange={(event) => { handleExcelImport(event.target.files[0], event)}} />
          </Button>
        </Tooltip>
        </Box>
    </>
  );
};
export default productTableColumns;
