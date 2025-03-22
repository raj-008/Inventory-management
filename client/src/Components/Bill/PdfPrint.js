import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import "./pdf.css";

const PdfPrintComponent = () => {
    const contentRef = useRef(null);

    const handlePrint = useReactToPrint({ contentRef });

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: "Printable_Document",
//   });

  const products = [
    { id: 1, name: "Product A", quantity: 2, price: 50 },
    { id: 2, name: "Product B", quantity: 1, price: 100 },
    { id: 3, name: "Product C", quantity: 3, price: 30 },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.quantity * product.price, 0);
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;
  const billNumber = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit bill number


  return (
    <div>
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Print as PDF
      </Button>
      
      <Card ref={contentRef} sx={{ mt: 4, p: 2 }} className="print-container">
        <CardContent className="card-content">
          {/* Company Details Centered */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">ABC Traders</Typography>
            <Typography>123 Business Street, City, Country</Typography>
            <Typography>Phone: +123 456 7890</Typography>
            <Typography>Email: contact@abctraders.com</Typography>
          </Box>
          
          {/* <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Invoice</Typography> */}
          <Typography>Customer: John Doe</Typography>
          <Typography>Bill No: {billNumber}</Typography>
          <Typography>Date: {new Date().toLocaleDateString()}</Typography>
          
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
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>${product.quantity * product.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}><strong>Subtotal</strong></TableCell>
                  <TableCell>${subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}><strong>Tax (10%)</strong></TableCell>
                  <TableCell>${tax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}><strong>Grand Total</strong></TableCell>
                  <TableCell><strong>${grandTotal.toFixed(2)}</strong></TableCell>
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
