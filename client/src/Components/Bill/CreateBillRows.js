import React, { useEffect } from "react";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, FormControl, Select, MenuItem, TextField, FormHelperText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useFieldArray } from "react-hook-form";

const CreateBillRows = ({ products, setGrandTotal, control, register, handleChange, watch, errors }) => {
  const { fields, append, remove } = useFieldArray({ name: "items", control });

  useEffect(() => {
    const subscription = watch((value) => {
      const items = value.items || [];
      let grandTotal = items.reduce((sum, item) => {
        const quantity = Number(item.qty) || 0;
        const price = Number(item.price) || 0;
        return sum + quantity * price;
      }, 0);
      const taxes = Number(value.tax) || 0;
      grandTotal += taxes;
      setGrandTotal(grandTotal);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
          {fields.map((row, index) => {
            const quantity = watch(`items.${index}.qty`) || 0;
            const price = watch(`items.${index}.price`) || 0;
            const total = quantity * price;
            return (
              <TableRow key={row.id}>
                <TableCell>
                  <FormControl sx={{ minWidth: 200 }} size="small">
                    <Select inputProps={{ "aria-label": "Without label" }} {...register(`items.${index}.product_id`, { required: { value: true, message: "Please Select Product" } })} error={!!errors?.items?.[index]?.product_id} value={row.product_id} displayEmpty onChange={(e) => handleChange(index, "product_id", e.target.value)} >
                      <MenuItem value="">Select</MenuItem>
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
                  <TextField type="number" variant="outlined" size="small" {...register(`items.${index}.qty`, { required: { value: true }, valueAsNumber: true, min: { value: 1, message: "Must be at least 1" }, max: { value: 60, message: "Cannot be more than 100" }, })} error={!!errors?.items?.[index]?.qty} />
                </TableCell>

                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    size="small"
                    {...register(`items.${index}.price`, { required: { value: true }, valueAsNumber: true, min: { value: 1, message: "Must be at least 1" } })}
                    error={!!errors?.items?.[index]?.price}
                  />
                </TableCell>

                {/* Total */}
                <TableCell>{total}</TableCell>

                {/* Remove Button */}
                <TableCell>
                  <Button color="error" onClick={() => remove(index)} disabled={fields.length === 1}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button color="primary" onClick={() => append({ product_id: "", qty: 0, price: 0 })} style={{ textTransform: "none" }} sx={{ marginTop: 2 }}>
        <AddIcon sx={{ marginRight: 0.5 }} /> Product
      </Button>
    </div>
  );
};

export default CreateBillRows;
