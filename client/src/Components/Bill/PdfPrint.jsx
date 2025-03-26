import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import "./pdf.css";
import { useAuth } from "../../Context/AuthContext";

const PdfPrintComponent = ({ billData }) => {
  const contentRef = useRef(null);

  const { logOut, user } = useAuth();

  const handlePrint = useReactToPrint({ contentRef });

  const products = billData.billproducts;

  let subTotal = 0;
  products.forEach((el) => subTotal += (el.qty*el.price));

  const billDate = new Date(billData.date);
  const formattedDate = `${String(billDate.getDate()).padStart(2, "0")}-${String(billDate.getMonth() + 1).padStart(2, "0")}-${billDate.getFullYear()}`;
  
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print as PDF
      </Button>
      
      <Card ref={contentRef} sx={{ mt: 4, p: 2 }} className="print-container">
        <CardContent className="card-content">
          {/* Company Details Centered */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">{user.company}</Typography>
            {/* <Typography>123 Business Street, City, Country</Typography> */}
            <Typography>Phone: +91 {user.phone}</Typography>
            <Typography>Email: {user.email}</Typography>
          </Box>
          
          <Typography>Customer: {billData.customer_name}</Typography>
          <Typography>Bill No: {billData.bill_number}</Typography>
          <Typography>Date: {formattedDate}</Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table className="pdf-table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Product</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Price</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.product_name}</TableCell>
                    <TableCell>{`${product.qty || 0}  ${product.unit}`}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>${product.qty * product.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}><strong>Subtotal</strong></TableCell>
                  <TableCell>${subTotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}><strong>Discount / Surcharge</strong></TableCell>
                  <TableCell>${billData.tax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}><strong>Grand Total</strong></TableCell>
                  <TableCell><strong>${billData.total_amount.toFixed(2)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Signature Box */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ width: 200, height: 80, textAlign: 'center', pt: 9 }}>
              <Typography variant="body2">Authorized Signature</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default PdfPrintComponent;
