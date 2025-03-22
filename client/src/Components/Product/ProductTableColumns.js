import React from "react";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Tooltip from "@mui/material/Tooltip";

const productTableColumns = (navigate, handleDelete) => [
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
      <div>
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
      </div>
    ),
    center: "true",
  },
];

export const ActionButton = ({ setIsEdit, handleOpen }) => {
  return (
    <>
      <Link to="/product/create">
        <IconButton variant="text" style={{ padding: "12px 12px" }}>
          <LibraryAddIcon style={{ fontSize: "32px", color: "#737373" }} />
        </IconButton>
      </Link>
      <Link to="/product/create">
        <Tooltip title="Excel Import">
          <IconButton variant="text" style={{ padding: "12px 12px" }}>
            <UploadFileIcon style={{ fontSize: "32px", color: "#737373" }} />
          </IconButton>
        </Tooltip>
      </Link>
    </>
  );
};
export default productTableColumns;
