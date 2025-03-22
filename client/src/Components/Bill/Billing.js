import React, { useState } from "react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { elements } from "chart.js";
import AddIcon from '@mui/icons-material/Add';


const Billing = ({ products, getTotal }) => {
  const [rows, setRows] = useState([
    { id: 1, product_id: "", quantity: 0, amount : 0, total: 0 },
  ]);

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    let total = 0;

    // If product is selected, update price
    if (field === "product_id") {
      const selectedProduct = products.find((p) => p._id === value);
      updatedRows[index].amount = selectedProduct ? selectedProduct.amount : 0;
      updatedRows[index].quantity = 1;
      let qty = updatedRows[index].quantity != null ? updatedRows[index].quantity : 1;
      let price = updatedRows[index].amount != null ? updatedRows[index].amount : 0;
      updatedRows[index].total = qty*price;
      
      updatedRows.forEach( element => {
        total += element.amount;
      });

    }

    // Update total on quantity or price change
    if (field === "quantity" || field === "amount") {
      let qty = updatedRows[index].quantity != null ? updatedRows[index].quantity : 0;
      let price = updatedRows[index].amount != null ? updatedRows[index].amount : 0;
      updatedRows[index].total = qty*price;
      total = 0;
      updatedRows.forEach( element => {
        total += element.amount;
      });
    }

    getTotal(total);
    setRows(updatedRows);
  };

  // Add new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, product_id: "", quantity: 0, amount: 0, total: 0 }]);
  };

  // Remove row
  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    let total = 0;
    updatedRows.forEach(row => {
      total += row.amount ?? 0;
    });
    getTotal(total);
    setRows(updatedRows);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id}>
              {/* Product Dropdown */}
              <TableCell>
              <FormControl sx={{ minWidth: 200 }} size="small">
                {/* <InputLabel id="demo-select-small-label">Select Product</InputLabel> */}
                  <Select inputProps={{ 'aria-label': 'Without label' }}  value={row.product_id} displayEmpty onChange={(e) => handleChange(index, "product_id", e.target.value)} >
                    <MenuItem value="" selected>Select</MenuItem>
                    {products.map((product) => (
                      <MenuItem key={product._id} value={product._id}>
                        {product.name}
                    </MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </TableCell>

              {/* Quantity Input */}
              <TableCell>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={row.quantity}
                  onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
                />
              </TableCell>

              {/* Price Input (Auto-filled from product selection) */}
              <TableCell>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={row.amount}
                  onChange={(e) => handleChange(index, "amount", Number(e.target.value))}
                />
              </TableCell>

              {/* Total */}
              <TableCell>{row.total}</TableCell>

              {/* Remove Button */}
              <TableCell>
                <Button color="error" onClick={() => removeRow(index)} disabled={rows.length === 1}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button color="primary" onClick={addRow} style={{ textTransform: "none" }} sx={{ marginTop: 2 }}>
        <AddIcon sx={{ marginRight : 0.5 }} /> Product
      </Button>
    </div>
  );
};

export default Billing;
