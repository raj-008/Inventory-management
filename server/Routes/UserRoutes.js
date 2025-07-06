const express = require("express");
const router = express.Router();
const UsersController = require("../Controller/UserController");
const AuthController = require("../Controller/AuthController");
const { resetPassword } = require("../Validation/resetPassword");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.put("/update", AuthMiddleware, UsersController.update);
router.delete("/delete/:id", AuthMiddleware, AuthController.checkRole("admin"), UsersController.delete);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", resetPassword(), AuthController.resetPassword);
router.post("/verify-email", UsersController.verifyEmail);

module.exports = router;
