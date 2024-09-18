const express = require("express");
const router = express.Router();
const BillController = require("../Controller/BillController");
const AuthController = require("../Controller/AuthController");
const BillValidation = require("../Validation/BillValidation");

router.get("/", AuthController.protect, BillController.read);
router.post("/create", AuthController.protect,BillValidation(), BillController.create);
router.post("/update/:id", AuthController.protect,BillValidation(), BillController.update);
router.delete("/delete/:id", AuthController.protect, BillController.destroy);

module.exports = router;
