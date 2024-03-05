import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Layout from "../Layout/Layout";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import usePreviewImage from "../../hooks/usePreviewImage";
import Stack from "@mui/material/Stack";

export default function Setting() {
  const { previewImage, handleFileChange } = usePreviewImage();

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Layout>
        <Box sx={{ width: "100%", typography: "body1", p:3 }} style={{ backgroundColor: "white"}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="General" value="1" />
                <Tab label="Company" value="2" />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <TextField id="outlined-basic" label="Name" className="input-text" sx={{ width: "100%" }} variant="outlined" />
                <TextField id="outlined-basic" label="Email" className="input-text" sx={{ width: "100%" }} variant="outlined" />
                <TextField id="outlined-basic" label="Phone" className="input-text" sx={{ width: "100%" }} variant="outlined" />
              </div>
              <Button variant="contained" className="save-btn">
                Save
              </Button>
            </TabPanel>
            <TabPanel value="2">
              {/* <div> */}
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
            </TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </Layout>
    </>
  );
}
