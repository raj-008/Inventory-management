import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import GrainRoundedIcon from "@mui/icons-material/GrainRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import Chart from "chart.js/auto";
import useFetchData from "../../hooks/useFetchData";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, error, loading] = useFetchData(`${window.SERVER_URL}/api/v1/dashboard`, refreshKey);
  const dashboardData = data.data || [];

  let totalSale = 0;
  let monthlySaleData = [];
  let totalBillCount = 0;
  let pieChartLabels = [];
  let pieChartData = [];
  if (dashboardData.productsData) {
    totalBillCount = dashboardData.productsData.totalBillCount;
    totalSale = dashboardData.productsData.totalSale;    
    monthlySaleData = dashboardData.productsData.monthlySale;
    monthlySaleData.sort((a, b) => Number(a.monthYear) - Number(b.monthYear));
    dashboardData.categorySales.forEach((el) => {
      pieChartLabels.push(el.category_name);
      pieChartData.push(el.category_wise_total_sale);
    });
  }

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const monthMapping = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    const lineCtx = document.getElementById("lineChart");

    if (lineCtx) {
      // Destroy previous chart instance if it exists
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }

      if (!monthlySaleData) monthlySaleData = [];


      lineChartRef.current = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: monthlySaleData.map((row) => monthMapping[row.monthYear]),
          datasets: [
            {
              label: "Monthly Sale",
              data: monthlySaleData.map((row) => row.amount),
            },
          ],
        },
      });
    }

    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, [dashboardData]);
  // End Line Chart

  // Start Pie Chart
  useEffect(() => {
    const pieData = {
      labels: pieChartLabels,
      datasets: [
        {
          data: pieChartData,
          backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(0, 153, 51)", "rgb(0, 0, 102)", "rgb(153, 51, 153)", "rgb(255, 153, 51)", "rgb(0, 153, 153)"],
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
  }, [dashboardData]);
  // End Pie Chart

  if (loading) {
    return (
      <Box
        elevation={0}
        style={{
          height: "100vh", // makes the Box fill the full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // optional, in case you add more content later
        }}
      >
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  return (
    <>
      <Layout>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
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
                    ${totalSale || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
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
                    {totalBillCount || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
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
                    {dashboardData.totalCategories || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
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
                    {dashboardData.totalBrands || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 9 }}>
            <Box className="box">
              <Card variant="outlined">
                <CardContent>
                  <canvas id="lineChart" style={{ width: "100%" }}></canvas>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 3 }}>
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
