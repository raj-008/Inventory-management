import * as React from "react";
import Box from "@mui/material/Box";
import Layout from "../Layout/Layout";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import usePreviewImage from "../../hooks/usePreviewImage";
import { useAuth } from "../../Context/AuthContext";

export default function Setting() {
  const { previewImage, handleFileChange } = usePreviewImage();
  const { user } = useAuth();
  return (
    <>
      <Layout>
        <Box sx={{ width: "100%", typography: "body1", p: 3 }} style={{ backgroundColor: "white" }}>
          <TextField id="outlined-basic" label="Name" className="input-text" variant="outlined" />
          <TextField id="outlined-basic" label="Email" className="input-text" variant="outlined" />
          <TextField id="outlined-basic" label="Phone" className="input-text" variant="outlined" />
          <TextField id="outlined-basic" label="Address" className="input-text" sx={{ width: "100%" }} variant="outlined" />
          <div className="file-input">
            <Button component="label" variant="outlined" className="input-file-button" sx={{ marginRight: "1rem" }}>
              <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              {previewImage && <img src={previewImage} alt="Preview" className="input-preview-img" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
              <br />
              Company Logo
            </Button>
          </div>
          {/* </div> */}
          <Button variant="contained" className="save-btn">
            Save
          </Button>
        </Box>
      </Layout>
    </>
  );
}
