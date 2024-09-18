const { body } = require("express-validator");

const BillValidation = () => {
  return [
    body("product_id").notEmpty().withMessage("Product Id can not be empty").isString().withMessage("product Id should be string only"),
    body("qty").notEmpty().withMessage("Quantity should not be empty").isNumeric().withMessage("Quantity should be number only"),
    body("description").optional().isString().withMessage("Description should be string only"),
    body("tax").optional().isNumeric().withMessage("Tax should be number only"),
    body("total_amount").notEmpty().withMessage("Total Amount should not be empty").isNumeric().withMessage("Total Amount should be number only"),
  ];
};

module.exports = BillValidation;
