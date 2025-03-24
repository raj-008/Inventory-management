const express = require("express");
const router = express.Router();
const AuthController = require("../Controller/AuthController");
const DashboardController = require("../Controller/DashboardController");

router.get("/", AuthController.protect, DashboardController.dashboardData);

module.exports = router;
