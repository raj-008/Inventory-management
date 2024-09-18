const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/ProductController");
const AuthController = require("../Controller/AuthController");
const ProductValidation = require("../Validation/ProductValidation");

router.get("/", AuthController.protect, ProductController.read);
router.post("/create", AuthController.protect, ProductValidation(), ProductController.create);
router.post("/update/:id", AuthController.protect, ProductValidation(), ProductController.update);
router.delete("/delete/:id", AuthController.protect, ProductController.destroy);

module.exports = router;
