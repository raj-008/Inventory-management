const express = require("express");
const router = express.Router();
const AdminUsersController = require("../../Controller/Admin/UserController");
const AuthController = require("../../Controller/AuthController");

router.get("/", AuthController.protect, AuthController.checkRole("admin"), AdminUsersController.getUsers);
router.get("/details/:id", AuthController.protect, AuthController.checkRole("admin"), AdminUsersController.userDetails);
router.get("/status/:id", AuthController.protect, AuthController.checkRole("admin"), AdminUsersController.userStatus);

module.exports = router;
