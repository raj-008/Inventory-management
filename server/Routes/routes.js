const express = require("express");
const router = express.Router();
const BrandRoutes = require("./BrandRoutes");
const CategoryRoutes = require("./CategoryRoutes");
const SettingRoutes = require("./SettingRoutes");
const UserRoutes = require("./UserRoutes");
const ProductRoutes = require("./ProductRoutes");
const BillRoutes = require("./BillRoutes");
const DashboardRoutes = require("./DashboardRoutes");
const { loginValidation } = require("../Validation/loginValidator");
const { RegisterValidation } = require("../Validation/RegisterValidation");
const AuthController = require("../Controller/AuthController");
const UsersController = require("../Controller/UserController");
const AdminUserRoutes = require("../Routes/Admin/UserRoutes");
const AdminSettingRoutes = require("../Routes/Admin/SettingRoutes");

router.post("/login", loginValidation(), AuthController.login);
router.post("/register", RegisterValidation(), UsersController.create);

router.use("/user", UserRoutes);
router.use("/brand", BrandRoutes);
router.use("/category", CategoryRoutes);
router.use("/settings", SettingRoutes);
router.use("/product", ProductRoutes);
router.use("/bill", BillRoutes);
router.use("/dashboard", DashboardRoutes);
router.use("/admin/user", AdminUserRoutes);
router.use("/", AdminSettingRoutes);

module.exports = router;
