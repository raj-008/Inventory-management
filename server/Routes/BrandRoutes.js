const express = require("express");
const router = express.Router();
const BrandController = require("../Controller/BrandController");
const AuthController = require("../Controller/AuthController");
const BrandValidation = require("../Validation/BrandValidation");

router.get("/", AuthController.protect, BrandController.show);
router.post("/create", AuthController.protect, BrandValidation(), BrandController.store);
router.get("/edit/:id", AuthController.protect, BrandValidation(), BrandController.edit);
router.post("/update/:id", AuthController.protect, BrandValidation(), BrandController.update);
router.delete("/delete/:id", AuthController.protect, BrandController.destroy);

module.exports = router;
