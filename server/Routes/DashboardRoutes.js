const express = require("express");
const router = express.Router();
const AuthController = require("../Controller/AuthController");
const UserDashboardController = require("../Controller/UserDashboardController");

router.get("/", AuthController.protect, UserDashboardController.dashboardData);

module.exports = router;
