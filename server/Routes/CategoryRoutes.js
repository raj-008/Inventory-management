const express = require("express");
const router = express.Router();
const CategoryController = require("../Controller/CategoryController");
const CategoryValidation = require("../Validation/CategoryValidation");
const AuthController = require("../Controller/AuthController");

router.get("/", AuthController.protect, CategoryController.show);
router.post("/create", AuthController.protect, CategoryValidation(), CategoryController.store);
router.get("/edit/:id", AuthController.protect,  CategoryController.edit);
router.post("/update/:id", AuthController.protect, CategoryValidation(), CategoryController.update);
router.delete("/delete/:id", AuthController.protect, CategoryController.destroy);

module.exports = router;
