const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const DashboardController = require("../Controller/DashboardController");

router.get("/", AuthMiddleware, DashboardController.dashboardData);

module.exports = router;
