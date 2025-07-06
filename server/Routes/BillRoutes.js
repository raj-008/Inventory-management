const express = require("express");
const router = express.Router();
const BillController = require("../Controller/BillController");
const BillValidation = require("../Validation/BillValidation");
const AuthMiddleware = require("../Middleware/AuthMiddleware");

router.get("/", AuthMiddleware, BillController.read);
router.post("/create", AuthMiddleware, BillValidation(), BillController.create);
router.get("/details/:id", AuthMiddleware, BillValidation(), BillController.getBillDeatils);
router.post("/update/:id", AuthMiddleware, BillValidation(), BillController.update);
router.delete("/delete/:id", AuthMiddleware, BillController.destroy);

module.exports = router;
