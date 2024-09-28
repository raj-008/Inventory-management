import React from "react";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";

const billTableColumns = (navigate, handleClose, handleOpen, handleDelete) => [
  {
    name: "Bill No",
    selector: (row) => row.bill_number,
    searchable: true,
    sortable: true,
  },
  {
    name: "Bill Amount",
    selector: (row) => "$" + row.total_amount,
    sortable: true,
    center: "true",
  },
  {
    name: "Quantity",
    selector: (row) => row.qty,
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
            navigate("/bill/edit/" + row._id);
          }}
          style={{ marginRight: "8px" }}
        >
          <ModeIcon style={{ color: "#8080ff" }} />
        </IconButton>
        <IconButton variant="contained" value={row.id} onClick={() => handleDelete(row._id)}>
          <DeleteIcon style={{ color: "#ff8080" }} />
        </IconButton>
        <IconButton variant="contained" value={row.id} onClick={() => handleOpen(row._id)}>
          <InfoIcon style={{ color: "#00b300" }} />
        </IconButton>
      </div>
    ),
    center: "true",
  },
];

export const ActionButton = ({ setIsEdit, handleOpen }) => {
  return (
    <>
      <Link to="/bill/create">
        <IconButton variant="text" style={{ padding: "12px 12px" }}>
          <LibraryAddIcon style={{ fontSize: "32px", color: "#737373" }} />
        </IconButton>
      </Link>
    </>
  );
};
export default billTableColumns;
