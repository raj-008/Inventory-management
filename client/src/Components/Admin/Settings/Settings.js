import React, { useState, useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useFetchData from "../../../hooks/useFetchData";

function Setting() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [setting, setSetting] = useState({
    appAddress: "",
    appEmail: "",
    appContact: "",
  });

  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/settings/66e829340c253066f5300889`, refreshKey);
  const settings = data.data || [];

  useEffect(() => {
    if (data.data && data.data.length > 0) {
      setSetting({ appAddress: data.data[0].value, appEmail: data.data[1].value, appContact: data.data[2].value });
    }
  }, [data]);

  return (
    <>
      <Layout>
        <Paper elevation={0} style={{ padding: "32px" }}>
          <Grid container spacing={3}>
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField fullWidth label="Contact" variant="outlined" value={setting.appContact} />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField fullWidth label="Email" variant="outlined" value={setting.appEmail} />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField fullWidth label="Address" variant="outlined" value={setting.appAddress} />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}></Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>
        </Paper>
      </Layout>
    </>
  );
}

export default Setting;
