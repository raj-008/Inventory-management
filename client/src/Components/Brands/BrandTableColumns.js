import React from "react";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const brandTableColumns = (handleEdit, handleDelete) => [
  {
    name: "Name",
    selector: (row) => row.name,
    searchable: true,
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row) => moment(row.createdAt).format("DD-MM-YYYY HH:mm:ss"),
    sortable: true,
    center: true,
    searchable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div>
        <IconButton variant="contained" onClick={() => handleEdit(row._id)} style={{ marginRight: "8px" }}>
          <ModeIcon style={{ color: "#8080ff" }} />
        </IconButton>
        <IconButton variant="contained" onClick={() => handleDelete(row._id)}>
          <DeleteIcon style={{ color: "#ff8080" }} />
        </IconButton>
      </div>
    ),
    center: true,
  },
];

export const ActionButton = ({ setIsEdit, handleOpen }) => {
  return (
    <>
      <IconButton
        variant="text"
        style={{ padding: "12px 12px" }}
        onClick={() => {
          setIsEdit(false);
          handleOpen(true);
        }}
      >
        <LibraryAddIcon style={{ fontSize: "32px", color: "#737373" }} />
      </IconButton>
    </>
  );
};
export default brandTableColumns;
