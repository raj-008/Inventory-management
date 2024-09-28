import { React, useState } from "react";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import "./customTable.css";

const customStyles = {
  headCells: {
    style: {
      fontSize: "17px",
    },
  },
  cells: {
    style: {
      fontSize: "16px",
      color: "#666666",
    },
  },
};

const Brand = ({ tableData, tableColumns, actionButton, fixedHeader = true, defultSortingColumn = 1, defaultSortAsc = false }) => {
  const [search, setSearcch] = useState("");

  const handleSearch = (e) => {
    setSearcch(e.target.value);
  };

  const searchTabledata = (data, columns, search) => {
    const searchableColumns = columns.filter((column) => column.searchable);
    if (searchableColumns.length) {
      return data.filter((item) => {
        return searchableColumns.some((column) => {
          const searchColumnValue = column.selector(item);
          return searchColumnValue ? searchColumnValue.toString().toLowerCase().includes(search.toLowerCase()) : false;
        });
      });
    } else {
      return data;
    }
  };

  const filteredData = searchTabledata(tableData, tableColumns, search);

  return (
    <>
      <Paper elevation={0}>
        <div className="table-container" style={{ margin: "16px" }}>
          <Box spacing={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <TextField label="Search" variant="standard" onChange={handleSearch} style={{ marginBottom: "12px", marginTop: "12px" }} />
            </Box>
            <Box style={{ marginBottom: "0px", marginTop: "12px", marginRight: "36px" }}>{actionButton}</Box>
          </Box>
          <DataTable columns={tableColumns} data={filteredData} customStyles={customStyles} defaultSortFieldId={defultSortingColumn} fixedHeader={fixedHeader} fixedHeaderScrollHeight="65vh" defaultSortAsc={defaultSortAsc} pagination />
        </div>
      </Paper>
    </>
  );
};

export default Brand;
