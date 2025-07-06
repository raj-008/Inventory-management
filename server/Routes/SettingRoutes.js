const express = require("express");
const router = express.Router();
const SettingController = require("../Controller/SettingController");
const { upload } = require("../Utils/UploadMedia");
const AuthMiddleware = require("../Middleware/AuthMiddleware");


router.get("/:id", AuthMiddleware, SettingController.show);
router.post("/create", AuthMiddleware, upload.single("media"), SettingController.store);

module.exports = router;
