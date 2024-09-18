import React, { useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Chart from "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem("_authToken");

      if (!token) {
        navigate("/login");
      }

      const response = await axios.get("/validuser", {
        headers: {
          authorization: token,
        },
      });

      if (response.status === 200) {
        console.log(response);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Start Line Chart
    const lineData = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const lineCtx = document.getElementById("lineChart");

    if (lineCtx) {
      // Destroy previous chart instance if it exists
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }

      lineChartRef.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: lineData.map((row) => row.year),
          datasets: [
            {
              label: "Acquisitions by year",
              data: lineData.map((row) => row.count),
            },
          ],
        },
      });
    }

    // Cleanup function
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
    // End Line Chart
  }, []);

  useEffect(() => {
    // Start Pie Chart
    const pieData = {
      labels: ["Cosmetics", "Medicine", "Ayurvedik"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
          hoverOffset: 4,
        },
      ],
    };

    const pieConfig = {
      type: "pie",
      data: pieData,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Top Categories",
            font: {
              size: 14,
            },
          },
          legend: {
            position: "bottom",
            align: "center",
            tooltip: {
              callbacks: {
                label: function (context) {
                  let value = context.dataset.data[context.dataIndex];
                  return value.toLocaleString() + "%";
                },
              },
            },
          },
        },
      },
    };

    const pieCtx = document.getElementById("pieChart");

    if (pieCtx) {
      // Destroy previous chart instance if it exists
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }

      pieChartRef.current = new Chart(pieCtx, pieConfig);
    }

    // Cleanup function
    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
    };
    // End Pie Chart
  }, []);

  return (
    <>
      <Layout>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ maxWidth: "100%" }} className="box">
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <StoreRoundedIcon style={{ marginRight: "6px" }} /> Sales
                  </Typography>

                  <Typography sx={{ mb: 1 }} style={{ fontWeight: 500 }} color="text.secondary">
                    $125.25
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ maxWidth: "100%" }} className="box">
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <ReceiptRoundedIcon style={{ marginRight: "6px" }} /> Invoices
                  </Typography>

                  <Typography sx={{ mb: 1 }} style={{ fontWeight: 500 }} color="text.secondary">
                    5000000
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ maxWidth: "100%" }} className="box">
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <GrainRoundedIcon style={{ marginRight: "6px" }} /> Categories
                  </Typography>

                  <Typography sx={{ mb: 1 }} style={{ fontWeight: 500 }} color="text.secondary">
                    6000
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Box sx={{ maxWidth: "100%" }} className="box">
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    <BusinessRoundedIcon style={{ marginRight: "6px" }} /> Brands
                  </Typography>

                  <Typography sx={{ mb: 1 }} style={{ fontWeight: 500 }} color="text.secondary">
                    6000
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <Box className="box">
              <Card variant="outlined">
                <CardContent>
                  <canvas id="lineChart" style={{ width: "100%" }}></canvas>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Box className="box">
              <Card variant="outlined">
                <CardContent>
                  <canvas id="pieChart" style={{ height: "100%", width: "100%" }}></canvas>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
};

export default Dashboard;
