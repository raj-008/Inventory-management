import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PdfPrint from "./PdfPrint";
import { Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: "95vh",
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

function BillDetails({ open, handleClose, billData }) {
  if (!Object.keys(billData).length) {
    return;
  }
  return (
    <>
      <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 }}}>
        <Fade in={open}>
            <Box sx={style}>
              <PdfPrint billData={billData} />
            </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default BillDetails;
