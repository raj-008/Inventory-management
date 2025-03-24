const { body } = require("express-validator");

const BillValidation = () => {
  return [
    body("items").isArray({min:1}).withMessage("Products are invalid"),
    body("date").notEmpty().withMessage('Date is required'),
    body("description").optional().isString().withMessage("Description should be string only"),
    body("tax").optional().isNumeric().withMessage("Discount/Surcharge should be number only"),
    body("total_amount").notEmpty().withMessage("Total Amount should not be empty").isNumeric().withMessage("Total Amount should be number only"),
  ];
};

module.exports = BillValidation;
