const express = require("express");
const router = express.Router();
const AdminSettingController = require("../../Controller/Admin/SettingController");
const AuthController = require("../../Controller/AuthController");

router.get("/:id", AuthController.checkRole("admin"), AdminSettingController.read);
router.post("/create", AuthController.checkRole("admin"), AdminSettingController.store);

module.exports = router;
