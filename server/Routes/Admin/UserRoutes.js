const express = require("express");
const router = express.Router();
const AdminUsersController = require("../../Controller/Admin/UserController");
const AuthController = require("../../Controller/AuthController");

router.get("/", AuthController.checkRole("admin"), AdminUsersController.getUsers);
router.get("/details/:id", AuthController.checkRole("admin"), AdminUsersController.userDetails);
router.get("/status/:id", AuthController.checkRole("admin"), AdminUsersController.userStatus);

module.exports = router;
