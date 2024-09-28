import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

function BillDetails({ open, handleClose, billData }) {
  if (!Object.keys(billData).length) {
    return;
  }
  return (
    <>
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
            <Typography id="transition-modal-title" variant="h6" component="h6" sx={{ my: 2 }}>
              Order Number : <b>24</b>
            </Typography>
            <Typography id="transition-modal-description">
              <b>#</b> {billData.products.name} {billData.products.amount ? billData.products.amount : ""}
            </Typography>
            {/* <Typography id="transition-modal-description">2) Johnson & Johnson Baby Toothbrush ($20)</Typography>
            <Typography id="transition-modal-description">3) Johnson & Johnson Baby HairOil ($120)</Typography> */}
            <Box sx={{ my: 2 }}>
              <Typography id="transition-modal-description" variant="subtitle1">
                Tax : ${billData.tax}
              </Typography>
              <Typography id="transition-modal-description" variant="subtitle1">
                Net Payable : <b>${billData.total_amount}</b>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default BillDetails;
