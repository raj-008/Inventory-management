const { body } = require("express-validator");

const ProductValidation = () => {
  return [
    body("name").notEmpty().withMessage("Product Name should not be empty").isString().withMessage("Product Name should be text only"),
    body("qty").notEmpty().withMessage("Quantity should not be empty").isNumeric().withMessage("Quantity should be numbers only"),
    body("unit").optional().isString().withMessage("Unit should be text only"),
    body("amount").notEmpty().withMessage("Amount should not be empty").isNumeric().withMessage("Amount should be numbers only"),
    body("description").optional().isString().withMessage("Description should be text only"),
    body("category_id").notEmpty().withMessage("Category should not be empty").isString().withMessage("Category Id should be text only"),
    body("brand_id").notEmpty().withMessage("Brand should not be empty").isString().withMessage("Brand Id should be text only"),
  ];
};

module.exports = ProductValidation;
