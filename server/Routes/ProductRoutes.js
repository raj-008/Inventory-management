const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/ProductController");
const AuthMiddleware = require("../Middleware/AuthMiddleware");
const ProductValidation = require("../Validation/ProductValidation");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", AuthMiddleware, ProductController.read);
router.post("/create", AuthMiddleware, ProductValidation(), ProductController.create);
router.post("/import", AuthMiddleware, upload.single("excel"), ProductController.import);
router.get("/edit/:id", AuthMiddleware, ProductController.edit);
router.post("/update/:id", AuthMiddleware, ProductValidation(), ProductController.update);
router.delete("/delete/:id", AuthMiddleware, ProductController.destroy);

module.exports = router;
