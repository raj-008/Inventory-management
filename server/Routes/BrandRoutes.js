const express = require("express");
const router = express.Router();
const BrandController = require("../Controller/BrandController");
const BrandValidation = require("../Validation/BrandValidation");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.get("/", AuthMiddleware, BrandController.show);
router.post("/create", AuthMiddleware, BrandValidation(), BrandController.store);
router.get("/edit/:id", AuthMiddleware, BrandValidation(), BrandController.edit);
router.post("/update/:id", AuthMiddleware, BrandValidation(), BrandController.update);
router.delete("/delete/:id", AuthMiddleware, BrandController.destroy);

module.exports = router;
