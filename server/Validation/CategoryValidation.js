const { body } = require("express-validator");
const Category = require("../Models/CategoryModel");

const CategoryValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Category Should be text only")
      .notEmpty()
      .withMessage("Category can not be empty")
  ];
};

module.exports = CategoryValidation;
