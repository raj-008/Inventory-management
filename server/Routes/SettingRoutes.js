const express = require("express");
const router = express.Router();
const SettingController = require("../Controller/SettingController");
const AuthController = require("../Controller/AuthController");
const { upload } = require("../Utils/UploadMedia");

router.get("/:id", AuthController.protect, SettingController.show);
router.post("/create", AuthController.protect, upload.single("media"), SettingController.store);

module.exports = router;
