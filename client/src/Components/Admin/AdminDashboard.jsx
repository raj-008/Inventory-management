import React from "react";
import Layout from "../Layout/Layout";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import HikingIcon from "@mui/icons-material/Hiking";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const Dashboard = () => {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    // Start Line Chart
    const lineData = [
      { year: 2010 },
      { year: 2011 },
      { year: 2012 },
      { year: 2013 },
      { year: 2014 },
      { year: 2015 },
      { year: 2016 },
      { year: 2017 },
      { year: 2018 },
      { year: 2019 },
      { year: 2020 },
      { year: 2021 },
      { year: 2022 },
      { year: 2023 },
      { year: 2024 },
    ];

    const users = [
      { count: 10 },
      { count: 20 },
      { count: 15 },
      { count: 25 },
      { count: 22 },
      { count: 30 },
      { count: 28 },
      { count: 10 },
      { count: 20 },
      { count: 15 },
      { count: 25 },
      { count: 22 },
      { count: 30 },
      { count: 28 },
    ];

    const visitors = [
      { count: 4 },
      { count: 21 },
      { count: 5 },
      { count: 5 },
      { count: 23 },
      { count: 30 },
      { count: 26 },
      { count: 10 },
      { count: 20 },
      { count: 15 },
      { count: 25 },
      { count: 22 },
      { count: 30 },
      { count: 28 },
      { count: 10 },
    ];

    const customers = [
      { count: 11 },
      { count: 14 },
      { count: 19 },
      { count: 26 },
      { count: 21 },
      { count: 35 },
      { count: 28 },
      { count: 10 },
      { count: 20 },
      { count: 12 },
      { count: 13 },
      { count: 24 },
      { count: 26 },
      { count: 27 },
    ];

    const sales = [
      { count: 8 },
      { count: 21 },
      { count: 18 },
      { count: 26 },
      { count: 17 },
      { count: 25 },
      { count: 45 },
      { count: 8 },
      { count: 16 },
      { count: 15 },
      { count: 25 },
      { count: 19 },
      { count: 21 },
      { count: 26 },
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
              label: "Users",
              data: users.map((row) => row.count),
            },
            {
              label: "Visitors",
              data: visitors.map((row) => row.count),
            },
            {
              label: "Customers",
              data: customers.map((row) => row.count),
            },
            {
              label: "Sales",
              data: sales.map((row) => row.count),
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
      labels: ["Premium", "Business", "Pro"],
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
            text: "Top Plans",
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
                    <HikingIcon style={{ marginRight: "6px" }} /> Visitors
                  </Typography>

                  <Typography sx={{ mb: 1 }} style={{ fontWeight: 500 }} color="text.secondary">
                    125
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
                    <GroupsRoundedIcon style={{ marginRight: "6px" }} /> Users
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
                    <HowToRegRoundedIcon style={{ marginRight: "6px" }} /> Customers
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
                    <ReceiptRoundedIcon style={{ marginRight: "6px" }} /> Invoices
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
