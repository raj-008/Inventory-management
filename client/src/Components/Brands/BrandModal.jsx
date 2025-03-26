import React from "react";
import { Box, Typography, Modal, Fade, Backdrop, TextField, Button, Grid2 } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BrandModal = ({ open, onClose, isEdit, editFormData, onSubmit, register, errors }) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {isEdit ? "Edit Brand" : "Create Brand"}
          </Typography>
          <form onSubmit={onSubmit} method="post">
            <TextField
              label="Brand"
              {...register("name", { required: { value: true, message: "Brand is required" } })}
              variant="outlined"
              color="primary"
              type="text"
              sx={{ mb: 3 }}
              fullWidth
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
              defaultValue={isEdit ? editFormData.name : ""}
            />
            <Grid2 container justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Grid2>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default BrandModal;
