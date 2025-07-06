const express = require("express");
const router = express.Router();
const CategoryController = require("../Controller/CategoryController");
const CategoryValidation = require("../Validation/CategoryValidation");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.get("/", AuthMiddleware, CategoryController.show);
router.post("/create", AuthMiddleware, CategoryValidation(), CategoryController.store);
router.get("/edit/:id", AuthMiddleware,  CategoryController.edit);
router.post("/update/:id", AuthMiddleware, CategoryValidation(), CategoryController.update);
router.delete("/delete/:id", AuthMiddleware, CategoryController.destroy);

module.exports = router;
