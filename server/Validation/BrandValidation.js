const { body } = require("express-validator");
const Brand = require("../Models/BrandModel");

const BrandValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Brand Name should be text !")
      .notEmpty()
      .withMessage("Category can not be empty"),
      body("status").notEmpty().isBoolean().withMessage("Status should be True/False only"),
  ];
};

module.exports = BrandValidation;
